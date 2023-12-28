import React, {useState, useEffect} from 'react';
import fuzzysort from 'fuzzysort';
import './App.css';
import bhajans from './bhajans.json';
import lunr from 'lunr';


let idx = lunr(function() {
    this.ref('song_id');
    this.field('raga');
    this.field('tempo');
    this.field('beat');
    this.field('deity');
    this.field('language');
    this.field('level');
    this.field('title', {boost: 50});
    this.field('title2', {boost: 50})
    this.field('lyrics');



    bhajans.forEach(function (doc) {
        this.add(doc);
    }, this);
}) 

function App() {
  return (
    <div>
      <BhajanTable />
    </div>
  );
}

class BhajanTable extends React.Component {

  state = { filterStr: '', selectedBhajan: null };

  selectBhajan = (bhajan) => {
    this.setState({ selectedBhajan: bhajan });
  };

  renderBhajanDetails = (bhajan) => {
    var {title, title2, lyrics, meaning, url} = bhajan;
    var firstLine = title;
    if (title2) {
      firstLine = title2;
    } 
    lyrics = lyrics.replace(/\n/g, '<br/>');
    return (<div>
      <a href={"https://sairhythms.org"+url} target='blank'><h3>{firstLine}</h3></a>
      <p dangerouslySetInnerHTML={{ __html: lyrics }}></p>
      <em dangerouslySetInnerHTML={{ __html: meaning }}></em>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {Object.entries(bhajan).map(([key, value]) => {
            if (!value || value.length === 0 || ['song_id', 'meaning', 'url', 'alt_lang', 'ts', 'lyrics', 'title', 'title2', 'ulink'].includes(key)) return null; // Do not display song_id

            if (key.includes('lyrics')) {
              return (
                <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>{key}</strong></td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', whiteSpace: 'pre-wrap' }}>{value}</td>
                </tr>
              );
            }

            if (key === 'meaning') {
              return (
                <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>{key}</strong></td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }} dangerouslySetInnerHTML={{ __html: value }}></td>
                </tr>
              );
            }

            if (key.includes('audio_link')) {
              // if value is an array, return multiple audio tags
              let audios = []
              if (Array.isArray(value)) {
                audios = value.map((audio) => {
                  return (<audio key={value} controls src={audio} />)
                })
              } else {
                audios = (<audio controls src={value} />)
              }

              return (<tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>Audio</strong></td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{audios}</td>
              </tr>);
            }

            if (key.includes('video_link')) {
              let videos = []
              if (Array.isArray(value)) {
                videos = value.map((video) => (
                  <a href={video}>{video}</a>
                ))
              } else {
                videos = (<a href={value}>{value}</a>)
              }
              return (<tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>Video</strong></td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  {videos}
                </td>
              </tr>)
            }

            return (
              <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>{key}</strong></td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>{Array.isArray(value) ? value.join(', ') : value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>)
  };

  render() {
    const { filterStr, selectedBhajan } = this.state;
    
    const options = {
      keys: ['title', 'title2', 'lyrics', /*'meaning', 'language', 'deity', 'raga', 'beat', 'tempo', 'level'*/],
      threshold: -10000,
      all: true,
    };
    const results = fuzzysort.go(filterStr, bhajans , options);

    // let results2 = idx.search(filterStr);
   
    const filteredElements = results.map((bhajan) => (
      <tr key={bhajan.obj.song_id} >
        <td>
          <button style={{ background: 'none', color: 'blue', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.selectBhajan(bhajan.obj)}>{bhajan.obj.title}</button>
        </td>
      </tr>
    ));

    // const filteredElements = results2.map((bhajanRes) => {
    //   let bhajan = bhajans.filter((bhajan) => bhajan.song_id === bhajanRes.ref)[0];
    //   return (
    //     <tr key={bhajan.song_id} >
    //       <td>
    //         <button style={{ background: 'none', color: 'blue', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.selectBhajan(bhajan)}>{bhajan.title}</button>
    //       </td>
    //     </tr>
    //   );
    
    // })

    return (
      <div style={{ display: 'flex' }}>
        <div>
          Search bhajan: <br/>
          <input
            type="text"
            value={filterStr}
            onChange={(e) => this.setState({ filterStr: e.target.value })}
            style={{
              padding: '10px',
              border: '2px solid #ccc',
              borderRadius: '5px',
              width: '25vw',
              fontSize: '16px',
              outline: 'none',
              boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
            }}
          />
          <div style={{overflowY: 'scroll', maxHeight: '90vh', maxWidth: '50vh', minWidth: '30vw'}}>
            {filteredElements}
          </div>
        </div>
        <div style={{ marginLeft: '20px' }}>
          {selectedBhajan && (
            <div>
              {this.renderBhajanDetails(selectedBhajan)}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

function makeAllValuesLowercase(obj) {
  if (typeof obj === 'object' && obj !== null) {
    // If the input is an object, recursively process its properties
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        obj[key] = makeAllValuesLowercase(obj[key]);
      }
    }
  } else if (typeof obj === 'string') {
    // If the value is a string, convert it to lowercase
    obj = obj.toLowerCase();
  }
  return obj;
}