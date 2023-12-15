import React from 'react';
import fuzzysort from 'fuzzysort';
import './App.css';
import bhajans from './bhajans.json';

function App() {
  let b = makeAllValuesLowercase(bhajans);
  return (
    <div>
      <BhajanTable elements={b} />
    </div>
  );
}

class BhajanTable extends React.Component {
  state = { filterStr: '', selectedBhajan: null };

  selectBhajan = (bhajan) => {
    this.setState({ selectedBhajan: bhajan });
  };

  renderBhajanDetails = (bhajan) => {
    return (
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {Object.entries(bhajan).map(([key, value]) => {
            if (!value || value.length === 0 || ['song_id','alt_lang'].includes(key)) return null; // Do not display song_id

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

            return (
                <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>{key}</strong></td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{Array.isArray(value) ? value.join(', ') : value}</td>
                </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  render() {
    const { elements } = this.props;
    const { filterStr, selectedBhajan } = this.state;
    const options = {
      keys: ['title', 'title2', 'lyrics', 'meaning', 'language', 'deity', 'raga', 'beat', 'tempo', 'level', 'songtags', 'ulink', 'url', 'ts'],
      threshold: -10000, // Adjust threshold for fuzziness
      all: true,
      tokenize: true,
    };
    const results = fuzzysort.go(filterStr, elements, options);
    const filteredElements = results.map((bhajan) => (
      <tr key={bhajan.obj.song_id} >
        <td>
          <button style={{ background: 'none', color: 'blue', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => this.selectBhajan(bhajan.obj)}>{bhajan.obj.title}</button>
        </td>
      </tr>
    ));

    return (
      <div style={{ display: 'flex' }}>
        <div>
          <input
            type="text"
            value={filterStr}
            onChange={(e) => this.setState({ filterStr: e.target.value })}
          />
          <table>
            <tbody>{filteredElements}</tbody>
          </table>
        </div>
        <div style={{ marginLeft: '20px' }}>
          {selectedBhajan && (
            <div>
              <h3>Bhajan Details</h3>
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