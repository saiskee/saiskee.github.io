import logo from './logo.svg';
import YouTube  from 'react-youtube';
import React from 'react';
import fuzzysort from 'fuzzysort';
import './App.css';

const agab_bhajans = [["Live Instrumental Music", "https://youtu.be/t20F_cZilPY?t=0"], ["Veda Chanting", "https://youtu.be/t20F_cZilPY?t=281"], ["Vaaje Mrudanga Taal Vina", "https://youtu.be/t20F_cZilPY?t=1920"], ["Tu Pyaar Ka Sagar Hain", "https://youtu.be/t20F_cZilPY?t=2320"], ["O Nesthama Priyamaina Bandhama", "https://youtu.be/t20F_cZilPY?t=2588"], ["Aye Fir Tere Dware", "https://youtu.be/t20F_cZilPY?t=2935"], ["Uzun \u0130nce Bir Yolday\u0131m", "https://youtu.be/t20F_cZilPY?t=3217"], ["Kanula Mundara Kadaliyaade", "https://youtu.be/t20F_cZilPY?t=3456"], ["Baaje Muraliya Baaje", "https://youtu.be/t20F_cZilPY?t=3728"], ["Sai Teri Pooja Karunga", "https://youtu.be/t20F_cZilPY?t=4309"], ["Sai Bin Raha Na Jaaye", "https://youtu.be/t20F_cZilPY?t=4832"], ["Apasthamba Sutramu", "https://youtu.be/t20F_cZilPY?t=5198"], ["Yei Ho Vitthale", "https://youtu.be/t20F_cZilPY?t=5589"], ["Welcome", "https://youtu.be/t20F_cZilPY?t=5966"], ["Lighting of Akhanda Jyoti and Sai-lent Sitting", "https://youtu.be/t20F_cZilPY?t=6122"], ["Multi-Faith Prayers", "https://youtu.be/t20F_cZilPY?t=6602"], ["Vinayaka Vinayaka", "https://youtu.be/qywiA8Ud_2w?t=0"], ["Antar Jyothi Jalao Sai", "https://youtu.be/qywiA8Ud_2w?t=441"], ["Araja Suno Mere Parama Kripalu", "https://youtu.be/qywiA8Ud_2w?t=700"], ["Parthishwara Sathya Saishwara", "https://youtu.be/qywiA8Ud_2w?t=1060"], ["Radhe Shyama Govinda Gopal", "https://youtu.be/qywiA8Ud_2w?t=1329"], ["Hey Nirakari Allah Hey Avatari Prabhu Ram", "https://youtu.be/qywiA8Ud_2w?t=1627"], ["As The Sun Shines On The Lotus Of My Heart", "https://youtu.be/qywiA8Ud_2w?t=1924"], ["Bhola Nath Hare Jagadeesha", "https://youtu.be/qywiA8Ud_2w?t=2239"], ["Jaya Jagat Janani Maa", "https://youtu.be/qywiA8Ud_2w?t=2447"], ["Ayodhya Vasi Ram Ram Ram Dasharatha Nandana Ram", "https://youtu.be/qywiA8Ud_2w?t=2574"], ["Rama Sai Rama Sai Rama Sai Ram", "https://youtu.be/qywiA8Ud_2w?t=2805"], ["Chitha Chora Muraliwala", "https://youtu.be/qywiA8Ud_2w?t=3102"], ["Shiva Shiva Shiva Shiva Shiva Hara Hey", "https://youtu.be/qywiA8Ud_2w?t=3394"], ["Tirumalesha Prabhu Govinda", "https://youtu.be/qywiA8Ud_2w?t=3714"], ["Jaganmate Jagat Janani", "https://youtu.be/QsYyN-RJttU?t=0"], ["Eshwari Nandana Sai Gopala", "https://youtu.be/QsYyN-RJttU?t=159"], ["Krishna Rama Govinda Gokula Nandana Gopala", "https://youtu.be/QsYyN-RJttU?t=389"], ["Raghuveera Ranadheera Rama Rama Ram", "https://youtu.be/QsYyN-RJttU?t=568"], ["Jaya Sai Guru Deva Sai Guru Deva", "https://youtu.be/QsYyN-RJttU?t=719"], ["Bhasma Bhooshithanga Sai Chandrashekhara", "https://youtu.be/QsYyN-RJttU?t=1037"], ["Vitthala Hari Vitthala", "https://youtu.be/QsYyN-RJttU?t=1332"], ["Jai Hari Bol Jai Sita Ram", "https://youtu.be/QsYyN-RJttU?t=1519"], ["Shiva Shambho Hara Hara Shambho", "https://youtu.be/QsYyN-RJttU?t=1752"], ["Bhajo Madhura Hari Naam Nirantara", "https://youtu.be/QsYyN-RJttU?t=1910"], ["Shiva Nataraj Donde Estas", "https://youtu.be/QsYyN-RJttU?t=2127"], ["Om Namo Narayanaya Hari Om Narayanaya", "https://youtu.be/QsYyN-RJttU?t=2250"], ["Govinda Gopala Narayana Hari", "https://youtu.be/QsYyN-RJttU?t=2428"], ["Vitthala Vitthala Vitthala Sai Narayana", "https://youtu.be/QsYyN-RJttU?t=2696"], ["Sri Krishna Govinda Hare Murare", "https://youtu.be/QsYyN-RJttU?t=3053"], ["Sri Gananatha Jaya Gananatha", "https://youtu.be/fQErm4Rk4ag?t=0"], ["Shiva Shakti Avatara O Lord Sai Baba", "https://youtu.be/fQErm4Rk4ag?t=326"], ["Hare Ram Japo Hari Naam", "https://youtu.be/fQErm4Rk4ag?t=678"], ["Jaya Manamohana Jaya Giridhari", "https://youtu.be/fQErm4Rk4ag?t=1006"], ["Devi Sharadamba", "https://youtu.be/fQErm4Rk4ag?t=1243"], ["Deena Natham Bhakta Parayanam Sai Ramam Bhajamyaham", "https://youtu.be/fQErm4Rk4ag?t=1559"], ["Aravinda Lochana Aartha Janavana Parthi Purishwara Ram", "https://youtu.be/fQErm4Rk4ag?t=1782"], ["Sai Rama Your Eyes I Am Caught In Your Eyes Sai Rama", "https://youtu.be/fQErm4Rk4ag?t=2194"], ["Chandi Janani Maa", "https://youtu.be/fQErm4Rk4ag?t=2553"], ["Maam Pahi Om Bhagawati", "https://youtu.be/fQErm4Rk4ag?t=2785"], ["Ranga Ranga Sri Ranga Narayana Vitthala", "https://youtu.be/fQErm4Rk4ag?t=2975"], ["Janani Janani Janani Jagat Kaarini Janani", "https://youtu.be/fQErm4Rk4ag?t=3214"], ["Nanda Mukunda Hari Govinda Narayan", "https://youtu.be/fQErm4Rk4ag?t=3438"], ["Hara Hara Shankara Gowri Chandramouli", "https://youtu.be/fQErm4Rk4ag?t=3693"], ["Sharanam Sharanam Sai Sharanam Sharanam Muruga", "https://youtu.be/fQErm4Rk4ag?t=3905"], ["Hey Shyama Sundara Hey Sai Sundara", "https://youtu.be/rkyXHzKvOaU?t=0"], ["Sai Ram Sai Shyam Mere Sai Ram", "https://youtu.be/rkyXHzKvOaU?t=315"], ["Makhana Chora Radha Lola", "https://youtu.be/rkyXHzKvOaU?t=745"], ["Tum Ho Prabhu Ghana Shyam O Sai", "https://youtu.be/rkyXHzKvOaU?t=1074"], ["Allah Ho Tum Eshwar Bhi Tum Mahavir Nanak Ram", "https://youtu.be/rkyXHzKvOaU?t=1309"], ["Janani Maa Sai Janani Maa", "https://youtu.be/rkyXHzKvOaU?t=1554"], ["Sada Nirantara Hari Guna Gao", "https://youtu.be/rkyXHzKvOaU?t=1898"], ["Kalyana Krishna Kamaneeya Krishna", "https://youtu.be/rkyXHzKvOaU?t=2104"], ["Jaya Jaya Jaya Hey Madhusudhana", "https://youtu.be/rkyXHzKvOaU?t=2357"], ["Akhanda Jyothi Jalao Sai Man Mandir Me", "https://youtu.be/rkyXHzKvOaU?t=2611"], ["Hari Guna Gao Hari Naama Gao", "https://youtu.be/rkyXHzKvOaU?t=2880"], ["Sundaranana Sundaranana", "https://youtu.be/rkyXHzKvOaU?t=3094"], ["Jaya Nandalala Jaya Nandalala", "https://youtu.be/rkyXHzKvOaU?t=3304"], ["Hey Shiva Shankara Namami Shankara", "https://youtu.be/rkyXHzKvOaU?t=3494"], ["Hum Sab Bole Namah Shivaya Hara Hara Hara Hara Mahadeva", "https://youtu.be/rkyXHzKvOaU?t=3651"], ["Aruna Ramana Sri Guru Deva", "https://youtu.be/YgoYKtJ-Vn0?t=0"], ["Kashi Mathura Hein Parthi Mein", "https://youtu.be/YgoYKtJ-Vn0?t=247"], ["Jaya Jagadeesha Jaya Paramesha", "https://youtu.be/YgoYKtJ-Vn0?t=520"], ["Prema Swaroopini Janani Maa", "https://youtu.be/YgoYKtJ-Vn0?t=832"], ["Shiva Shambho Shambho Shiva Shambho Mahadeva", "https://youtu.be/YgoYKtJ-Vn0?t=1121"], ["Bhajamana Shyama Sundara Giridhari", "https://youtu.be/YgoYKtJ-Vn0?t=1502"], ["Omkara Roopini Janani Maa", "https://youtu.be/YgoYKtJ-Vn0?t=1774"], ["The Name of God is Flowing Within Me", "https://youtu.be/YgoYKtJ-Vn0?t=2015"], ["Janani Janani Sathya Sai Shubha Janani", "https://youtu.be/YgoYKtJ-Vn0?t=2128"], ["Govinda Krishna Jai Gopala Krishna Jai Gopala Bala Bala Radha Krishna Jai", "https://youtu.be/YgoYKtJ-Vn0?t=2334"], ["Rama Kaho Sai Rama Kaho Shyama Kaho Ghanashyama Kaho", "https://youtu.be/YgoYKtJ-Vn0?t=2568"], ["Ven Mi Sai Rama", "https://youtu.be/YgoYKtJ-Vn0?t=2810"], ["Jagadeeshwari Daya Karo Maa", "https://youtu.be/YgoYKtJ-Vn0?t=2956"], ["Muralidhara Manamohana Madhusudhana Krishna", "https://youtu.be/YgoYKtJ-Vn0?t=3090"], ["Dhimitha Dhimitha Dhim Dhimitha Dhimitha Dhim Nache Bhola Nath", "https://youtu.be/YgoYKtJ-Vn0?t=3370"], ["Hara Hara Shankara Samba Sadashiva Esha Mahesha", "https://youtu.be/0mHh3t9Udc4?t=0"], ["Buddha Mahavira Yesu Sai", "https://youtu.be/0mHh3t9Udc4?t=335"], ["Manamohana Murali Gopal", "https://youtu.be/0mHh3t9Udc4?t=604"], ["Sai Om Sai Om Sai Om", "https://youtu.be/0mHh3t9Udc4?t=951"], ["Ananda Maya Bhagawan Hey Prema Maya Bhagawan", "https://youtu.be/0mHh3t9Udc4?t=1283"], ["We're Never Away From The Avatar Eyes", "https://youtu.be/0mHh3t9Udc4?t=1622"], ["Radhika Jeevana", "https://youtu.be/0mHh3t9Udc4?t=1923"], ["Without Singing To the Lord There's No Peace Or Happiness", "https://youtu.be/0mHh3t9Udc4?t=2200"], ["Sadguru Brahma Sanatana Hey", "https://youtu.be/0mHh3t9Udc4?t=2525"], ["Hari Bol Hare Ram Naam", "https://youtu.be/0mHh3t9Udc4?t=2796"], ["Deva Senapathe Skanda Subrahmanya Pahimam", "https://youtu.be/0mHh3t9Udc4?t=2973"], ["Aao Pyaare Nayana Hamare Sai Hamare Aao", "https://youtu.be/0mHh3t9Udc4?t=3358"], ["Bala Gopala Jai Jai Sai Shyam", "https://youtu.be/0mHh3t9Udc4?t=3640"], ["Subrahmanyam Bol Hara Hara Subrahmanyam Bol", "https://youtu.be/0mHh3t9Udc4?t=3876"], ["The Lord Unites Our Many Faiths", "https://youtu.be/0mHh3t9Udc4?t=4143"], ["Govinda Hare Gopala Hare", "https://youtu.be/bkyN90nYBE4?t=0"], ["Bhaktha Vatsala Tero Naam O Sai", "https://youtu.be/bkyN90nYBE4?t=277"], ["Mahadeva Shiva Shambho Shankara", "https://youtu.be/bkyN90nYBE4?t=610"], ["Giridhara Govinda Gopala Ghana Shyama Nandalala", "https://youtu.be/bkyN90nYBE4?t=830"], ["Govinda Gopala Jaya Madhava Gopala", "https://youtu.be/bkyN90nYBE4?t=1178"], ["Roopa Manohara Savari Sundara", "https://youtu.be/bkyN90nYBE4?t=1487"], ["Jeevana Jyothi Tum Ho Sai", "https://youtu.be/bkyN90nYBE4?t=1726"], ["Hara Gange Jaya Ho Hara Gange Jaya Ho", "https://youtu.be/bkyN90nYBE4?t=2123"], ["Sai Hamara Hum Sai Ke Aisa Prema Hamara", "https://youtu.be/bkyN90nYBE4?t=2463"], ["Amba Manda Hasa Vadani Manohari Sai Jagat Janani", "https://youtu.be/bkyN90nYBE4?t=2755"], ["Madhusudhana Hey Muralidhara", "https://youtu.be/bkyN90nYBE4?t=3019"], ["Sita Rakshaka Raama Dootha", "https://youtu.be/bkyN90nYBE4?t=3246"], ["Vitthala Vitthala Hari Vitthala Jaya Vitthala Vitthala Hari Vitthala", "https://youtu.be/bkyN90nYBE4?t=3352"], ["Bhaja Ranga Hare Vitthala Panduranga Hare Vitthala", "https://youtu.be/bkyN90nYBE4?t=3652"], ["Chitta Chora Yashoda Ke Bal Navaneeta Chora Gopala", "https://youtu.be/bkyN90nYBE4?t=3847"], ["Dehi Sharanam Simha Vahini", "https://youtu.be/bhE7Yvpn098?t=0"], ["Jaya Shankara Bhava Gochara Shiva Chidambara Omkara", "https://youtu.be/bhE7Yvpn098?t=392"], ["Srivatsankita Sri Kaustubhadhara", "https://youtu.be/bhE7Yvpn098?t=620"], ["Guru Sai Maheshwara", "https://youtu.be/bhE7Yvpn098?t=950"], ["Jagadashreya Sri Raghu Rama", "https://youtu.be/bhE7Yvpn098?t=1220"], ["Madhura Madhura Sai Rama", "https://youtu.be/bhE7Yvpn098?t=1465"], ["Vaikuntha Pathe Sai Hare", "https://youtu.be/bhE7Yvpn098?t=1684"], ["Raghava Raghu Nandana", "https://youtu.be/bhE7Yvpn098?t=1956"], ["Sai Baba Sakala Bhuvana Ke Daata", "https://youtu.be/bhE7Yvpn098?t=2170"], ["Govinda Govinda Narayana Sri Hari Narayana", "https://youtu.be/bhE7Yvpn098?t=2597"], ["Sathya Narayana Govinda Sai Narayana Govinda Keshava", "https://youtu.be/bhE7Yvpn098?t=2827"], ["Sathyam Gnanam Anantham Brahma", "https://youtu.be/bhE7Yvpn098?t=3051"], ["Shiva Shiva Shiva Shiva Shirdipurishwara Shambho Shankara Samba Shivom", "https://youtu.be/bhE7Yvpn098?t=3186"], ["Radha Pyaare Jaya Gopal", "https://youtu.be/bhE7Yvpn098?t=3431"], ["Narayana Narayana Jai Jai Govinda Hare", "https://youtu.be/bhE7Yvpn098?t=3591"], ["Sai Prema De Shanti De Ananda Prema De", "https://youtu.be/CIWfWYZ2hgk?t=0"], ["Poorna Brahma Avatara Sai", "https://youtu.be/CIWfWYZ2hgk?t=310"], ["Pratah Smaranam Sri Ramam", "https://youtu.be/CIWfWYZ2hgk?t=590"], ["Jai Kailasa Pathe Shiva Shankara", "https://youtu.be/CIWfWYZ2hgk?t=826"], ["Vitthala Narayana", "https://youtu.be/LEeO-WWIX5g?t=0"], ["Jaya Maa Devi", "https://youtu.be/LEeO-WWIX5g?t=318"], ["Jaya Jaya Pavana Kumara", "https://youtu.be/LEeO-WWIX5g?t=577"], ["21 Aums", "https://youtu.be/LEeO-WWIX5g?t=725"], ["Sanskrit Suprabhatam", "https://youtu.be/LEeO-WWIX5g?t=965"], ["English Suprabhatam", "https://youtu.be/LEeO-WWIX5g?t=1548"], ["Prathama Namana Gananayaka", "https://youtu.be/LEeO-WWIX5g?t=2135"], ["Swami You Are The Light In My Life", "https://youtu.be/LEeO-WWIX5g?t=2450"], ["Akhila Jagat Ke Daata Sai", "https://youtu.be/LEeO-WWIX5g?t=2840"], ["Antaranga Sai Anatha Natha Sai", "https://youtu.be/LEeO-WWIX5g?t=3160"], ["Sakala Bhuvana Ke Prabhu Parameshwara", "https://youtu.be/LEeO-WWIX5g?t=3410"], ["In The Stillness Of The Morning", "https://youtu.be/qagd0GKpxYc?t=0"], ["Raghukula Bhooshana Rajeeva Nayana", "https://youtu.be/qagd0GKpxYc?t=302"], ["Sai Kanhaiyya Sai Kanhaiyya", "https://youtu.be/qagd0GKpxYc?t=577"], ["Anupama Sundara Nanda Kishora", "https://youtu.be/qagd0GKpxYc?t=829"], ["Kamala Netra Saishwara", "https://youtu.be/qagd0GKpxYc?t=1260"], ["Karuna Niketana Bhaktha Sakha Prabhu", "https://youtu.be/qagd0GKpxYc?t=1520"], ["Deva Devottama Deena Samrakshaka", "https://youtu.be/qagd0GKpxYc?t=1814"], ["Janani Sai Devi Dayamayi", "https://youtu.be/qagd0GKpxYc?t=2102"], ["Kausalya Nandana Vaidehi Mohana", "https://youtu.be/qagd0GKpxYc?t=2323"], ["Take Me Away Won't You Carry Me", "https://youtu.be/qagd0GKpxYc?t=2576"], ["Tripura Sundari Sai Narayani", "https://youtu.be/qagd0GKpxYc?t=2868"], ["Brahmandanayaka Baba Parthi Purishwara Baba", "https://youtu.be/qagd0GKpxYc?t=3089"], ["Vishnu Satchidananda Nanda Venu Gopala Bala", "https://youtu.be/qagd0GKpxYc?t=3386"], ["Bhajo Ghana Shyam Bhajo Sita Ram Bhajo Sathya Sai Ram", "https://youtu.be/qagd0GKpxYc?t=3550"], ["Radhe Krishna Radhe Krishna Jai Sri Krishna Radhe Radhe", "https://youtu.be/qagd0GKpxYc?t=3771"], ["Sundara Mangala Gambheera Ganapati", "https://youtu.be/nQ9YKBrDwlg?t=0"], ["Jyothi Prakasha Prema Pradata Sai Mahadeva Namo", "https://youtu.be/nQ9YKBrDwlg?t=269"], ["Jaya Jagadeeshwari Maa", "https://youtu.be/nQ9YKBrDwlg?t=812"], ["Vishwaroopa Darshanam Sai Sai Naatham", "https://youtu.be/nQ9YKBrDwlg?t=1244"], ["Daya Nidhe Bhagawan Kripa Nidhe Bhagawan", "https://youtu.be/nQ9YKBrDwlg?t=1527"], ["Raghuvamsha Deepa Rama Hey Rama Sri Kodanda Kalyana Rama", "https://youtu.be/nQ9YKBrDwlg?t=1824"], ["Kodanda Rama Kalyana Rama", "https://youtu.be/nQ9YKBrDwlg?t=2285"], ["Hara Hara Hara Shambho Shambho", "https://youtu.be/nQ9YKBrDwlg?t=2542"], ["Vanamali Bhaya Haari Giridhari Shyam", "https://youtu.be/nQ9YKBrDwlg?t=2927"], ["Jyotirlinga Maheshwara Himagiri Vasa Gangadhara", "https://youtu.be/nQ9YKBrDwlg?t=3128"], ["Govinda Murahari Manasa Chora", "https://youtu.be/nQ9YKBrDwlg?t=3394"], ["Ranga Ranga Panduranga Bhaja Mana Panduranga", "https://youtu.be/nQ9YKBrDwlg?t=3687"], ["Shambho Shankara Samba Sadashiva Sai Mahadeva", "https://youtu.be/nQ9YKBrDwlg?t=3926"], ["When The Light I See Is Allah", "https://youtu.be/nQ9YKBrDwlg?t=4401"], ["Pranava Swaroopa Hari Om Sai", "https://youtu.be/q56XpOqhjFQ?t=0"], ["Sri Sai Rama Sundara Naama", "https://youtu.be/q56XpOqhjFQ?t=298"], ["Daya Karo Hari Narayana", "https://youtu.be/q56XpOqhjFQ?t=590"], ["Namo Sharada Namo Sharada Namo Sharada Mata", "https://youtu.be/q56XpOqhjFQ?t=856"], ["Sheetala Charanam Komala Charanam", "https://youtu.be/q56XpOqhjFQ?t=1147"], ["Man Ek Baar Hari Bol", "https://youtu.be/q56XpOqhjFQ?t=1423"], ["Adi Narayana Sai Narayana", "https://youtu.be/q56XpOqhjFQ?t=1682"], ["Aao Sai Narayana Darshan Deejo", "https://youtu.be/q56XpOqhjFQ?t=1900"], ["Ganga Jatadhara Gowri Shankara Girija Mana Ramana", "https://youtu.be/q56XpOqhjFQ?t=2146"], ["Jaya Jaya Deva Jagadeesha Deva", "https://youtu.be/6F53MGPLADI?t=0"], ["Danava Bhanjana Rama Sai Shyamala Komala Ram", "https://youtu.be/6F53MGPLADI?t=216"], ["Madhusudhana Hey Muralidhara", "https://youtu.be/6F53MGPLADI?t=538"], ["Narayan Narayan Bhaja Mana Narayan", "https://youtu.be/6F53MGPLADI?t=750"], ["Devi Bhavani Jagat Janani", "https://youtu.be/6F53MGPLADI?t=986"], ["Rama Kaho Krishna Krishna Kaho Eshwar Allah Sai Kaho", "https://youtu.be/6F53MGPLADI?t=1197"], ["Govinda Madhava Gopala Keshava", "https://youtu.be/6F53MGPLADI?t=1480"], ["Aao Aao Sai Natha", "https://youtu.be/6F53MGPLADI?t=1847"], ["Hare Murari Ranga Narayana Om", "https://youtu.be/6F53MGPLADI?t=2107"], ["Nirupama Guna Sadana Charana Niraja Dala Nayana", "https://youtu.be/6F53MGPLADI?t=2288"], ["Rama Krishna Tum Ho Jaya Ram Jaya Ram", "https://youtu.be/6F53MGPLADI?t=2537"], ["Sai Sai Smarana Karo", "https://youtu.be/6F53MGPLADI?t=2786"], ["Ramachandra Sri Ram", "https://youtu.be/OKvhKhwUi7Y?t=0"], ["Nandalala Hey Krishna Murari", "https://youtu.be/OKvhKhwUi7Y?t=251"], ["Prem Eshwar Hai Eshwar Prem Hai", "https://youtu.be/OKvhKhwUi7Y?t=518"], ["Krishna Krishna Yaduvara Krishna", "https://youtu.be/OKvhKhwUi7Y?t=862"], ["Muralidhara Murahara Natavara", "https://youtu.be/OKvhKhwUi7Y?t=1072"], ["Karuna Swaroopini Raja Rajeshwari", "https://youtu.be/OKvhKhwUi7Y?t=1278"], ["Rama Naama Tarakam Sada Bhajore", "https://youtu.be/OKvhKhwUi7Y?t=1500"], ["Hari Om Tat Sat Hari Om Tat Sat Hari Om Tat Sat Hari Om", "https://youtu.be/OKvhKhwUi7Y?t=1690"], ["Hey Krishna Madhava Govinda Gopala", "https://youtu.be/OKvhKhwUi7Y?t=1947"], ["Nandalala Shyama Sundara Nandalala", "https://youtu.be/OKvhKhwUi7Y?t=2157"], ["Hara Shiva Shankara Bhole Nath Shirdi Purishwara Sai Nath", "https://youtu.be/OKvhKhwUi7Y?t=2485"], ["Naam Bhajo Hari Naam Bhajo", "https://youtu.be/OKvhKhwUi7Y?t=2704"], ["Govinda Krishna Gopala Krishna Jai Govinda Govinda Govinda", "https://youtu.be/OKvhKhwUi7Y?t=2942"], ["Shyama Sundara Hari Govinda Bolo", "https://youtu.be/OKvhKhwUi7Y?t=3214"], ["Deena Natha Sai Guru Natha", "https://youtu.be/XPNjsbDtNGU?t=0"], ["Sundara Vadana Sarasija Nayana", "https://youtu.be/XPNjsbDtNGU?t=351"], ["Shirdi Ke Sai Parthi Ke Baba", "https://youtu.be/XPNjsbDtNGU?t=551"], ["Jaya Sai Shankara Jaya Abhayankara", "https://youtu.be/XPNjsbDtNGU?t=788"], ["Bhola Bhandari Baba Shiva Shiva Shiva Sai Baba", "https://youtu.be/XPNjsbDtNGU?t=1036"], ["I Only Have One Message For You Love All Serve All", "https://youtu.be/XPNjsbDtNGU?t=1254"], ["Kasturi Tilakam Narayanam", "https://youtu.be/XPNjsbDtNGU?t=1529"], ["Hari Hari Narayana", "https://youtu.be/XPNjsbDtNGU?t=1752"], ["Raghupathe Raghava Raja Rama", "https://youtu.be/XPNjsbDtNGU?t=1971"], ["Sri Raghu Nandana Janaki Jeevana", "https://youtu.be/XPNjsbDtNGU?t=2215"], ["Nataraja Nataraja Narthana Sundara Nataraja", "https://youtu.be/XPNjsbDtNGU?t=2483"], ["Prem Se Gao Mangala Naam", "https://youtu.be/XPNjsbDtNGU?t=2661"], ["Hari Om Hari Om Namah Shivaya", "https://youtu.be/XPNjsbDtNGU?t=2883"], ["Eshwar Allah Tere Naam Sai Tere Naam", "https://youtu.be/XPNjsbDtNGU?t=3110"], ["Anjana Nanda Veeram Ashoka Vana Sancharam", "https://youtu.be/XPNjsbDtNGU?t=3313"], ["Sai Narayana Narayana Mangala Naam", "https://youtu.be/XPNjsbDtNGU?t=3487"], ["Jaya Maa Jaya Maa Jagadeeshwari Sai Maa", "https://youtu.be/-eUQqm0V4As?t=0"], ["Jaya Maa Jaya Maa Daya Karo Sai Maa", "https://youtu.be/-eUQqm0V4As?t=422"], ["Karuna Sindhu Dasharatha Nandana Parthi Purishwara Ram", "https://youtu.be/-eUQqm0V4As?t=699"], ["Bhagawan Bhagawan Patita Pavana Ram", "https://youtu.be/-eUQqm0V4As?t=955"], ["Sai Pita Aur Mata Sai", "https://youtu.be/-eUQqm0V4As?t=1234"], ["Mathura Natha Gopala", "https://youtu.be/-eUQqm0V4As?t=1502"], ["Dhanya Ho Easwaramba", "https://youtu.be/-eUQqm0V4As?t=1729"], ["Mandir Me Tum Ram Ho Sai", "https://youtu.be/-eUQqm0V4As?t=1970"], ["Sai Naam Bolo Sathya Sai Naam Bolo", "https://youtu.be/-eUQqm0V4As?t=2192"], ["Mukunda Madhava Murali Manohara Govardhana Giridhari", "https://youtu.be/-eUQqm0V4As?t=2425"], ["Raghupathi Raghava Raja Ram", "https://youtu.be/-eUQqm0V4As?t=2655"], ["Madhuvana Murali Shyama Murari", "https://youtu.be/-eUQqm0V4As?t=3016"], ["Vaidehi Priya Vaikuntha Rama", "https://youtu.be/-eUQqm0V4As?t=3233"], ["Jaya Gananayaka Gowri Gajanana", "https://youtu.be/szY3CXLAWJA?t=0"], ["Peetambara Dhari Shyama Giridhari", "https://youtu.be/szY3CXLAWJA?t=363"], ["Ganga Mayi Parameshwari Gange", "https://youtu.be/szY3CXLAWJA?t=540"], ["Mukunda Madhava Shyama Gopala", "https://youtu.be/szY3CXLAWJA?t=798"], ["Hey Madanantaka Karunakara", "https://youtu.be/szY3CXLAWJA?t=1012"], ["Sai Satchidananda Guru", "https://youtu.be/szY3CXLAWJA?t=1266"], ["Hey Poorna Brahma Avatara Sai Ram Sai Ram", "https://youtu.be/szY3CXLAWJA?t=1491"], ["Sai Prabhu Giridhari Bhajamana Sai Prabhu Giridhari", "https://youtu.be/szY3CXLAWJA?t=1827"], ["Sing The Name Of The Lord Sai Rama", "https://youtu.be/szY3CXLAWJA?t=2057"], ["Tirumalai Vaasam Parthipuri Naatham Ananda Roopam Bhaje", "https://youtu.be/szY3CXLAWJA?t=2338"], ["Mangala Shubhakari Narayani", "https://youtu.be/szY3CXLAWJA?t=2653"], ["Hara Hara Shiva Shankara Hara Hara Shashi Shekhara", "https://youtu.be/szY3CXLAWJA?t=2827"], ["Mohana Ranga Sai Narayana", "https://youtu.be/szY3CXLAWJA?t=2986"], ["Jai Raghunandana Jaya Sita Ram", "https://youtu.be/szY3CXLAWJA?t=3283"], ["Shirdi Sai Parthi Sai Chinmaya Roopa Bhaktha Chintana Deva", "https://youtu.be/szY3CXLAWJA?t=3647"], ["Daya Karo Hey Karuna Nidhan Sai", "https://youtu.be/Q-IcLxxrN1A?t=0"], ["Shesha Shaila Vasa Narayana", "https://youtu.be/Q-IcLxxrN1A?t=209"], ["Ayodhya Vihari Sri Rama Rama Rama", "https://youtu.be/Q-IcLxxrN1A?t=513"], ["Mahadeva Maheshwara Sai Narayana", "https://youtu.be/Q-IcLxxrN1A?t=725"], ["Ramachandra Prabhu Raghuvamsha Rama", "https://youtu.be/Q-IcLxxrN1A?t=1048"], ["Kalavati Amba Saraswati", "https://youtu.be/Q-IcLxxrN1A?t=1313"], ["Hari Naam Gathe Chalo Sai Naam Gathe Chalo", "https://youtu.be/Q-IcLxxrN1A?t=1534"], ["Jai Jai Janani Sai Janani Ambe Bhavani Maa", "https://youtu.be/Q-IcLxxrN1A?t=1795"], ["Madhusudhana Hare Madhava", "https://youtu.be/Q-IcLxxrN1A?t=2085"], ["Sathya Sai Padambhujam Bhajore Manasa Nirantaram", "https://youtu.be/Q-IcLxxrN1A?t=2467"], ["Subrahmanyam Subrahmanyam Shanmukhanatha Subrahmanyam", "https://youtu.be/Q-IcLxxrN1A?t=2741"], ["Vanamali Radha Ramana Giridhari Govinda", "https://youtu.be/Q-IcLxxrN1A?t=2913"], ["Parthishwara Sai Baba Aao Aao Sai Nandalala", "https://youtu.be/Q-IcLxxrN1A?t=3206"], ["Dam Dam Dam Dam Damaru Baje", "https://youtu.be/Q-IcLxxrN1A?t=3453"], ["Jai Jai Jai Jai Ganapati Deva", "https://youtu.be/crSEaatnJtw?t=0"], ["Sankata Harana Govinda", "https://youtu.be/crSEaatnJtw?t=151"], ["Jagadeeshwari Daya Karo Maa", "https://youtu.be/crSEaatnJtw?t=421"], ["Koi Bole Hari Hari Koi Bole Ram Ram", "https://youtu.be/crSEaatnJtw?t=706"], ["Radhe Krishna Radhe Krishna", "https://youtu.be/crSEaatnJtw?t=978"], ["Bansi Bajao Man Mandir Mein", "https://youtu.be/crSEaatnJtw?t=1183"], ["Krishna Krishna Mana Mohana", "https://youtu.be/crSEaatnJtw?t=1426"], ["Jagadoddharini Mata Durga Jagadoddharini Maa", "https://youtu.be/crSEaatnJtw?t=1668"], ["Sarvatra Govinda Namasankeerthana Govinda Hari Govinda", "https://youtu.be/crSEaatnJtw?t=1996"], ["Shankara Sadashiva Sabha Pathe Manohara", "https://youtu.be/crSEaatnJtw?t=2196"], ["Jaya Ho Sai Ram Jaya Ho Sai Ram", "https://youtu.be/crSEaatnJtw?t=2379"], ["Hare Ram Hare Ram Hare Rama Krishna Hare Ram", "https://youtu.be/crSEaatnJtw?t=2692"], ["Sita Ram Hanumanta Ram Sita Hanumanta", "https://youtu.be/crSEaatnJtw?t=2891"], ["Bolo Jai Sai Ram Bolo Jai Sai Ram", "https://youtu.be/crSEaatnJtw?t=3093"], ["Ramachandra Raghuveera Ramachandra Ranadheera", "https://youtu.be/crSEaatnJtw?t=3378"], ["Hey Rambha Janani Sri Sai Janani", "https://youtu.be/LstmAIJi1rY?t=0"], ["Sai Madre Compasiva Madre Universal Madre M\u00eda", "https://youtu.be/LstmAIJi1rY?t=201"], ["Hridaya Spandana Sai Vandana", "https://youtu.be/LstmAIJi1rY?t=478"], ["Sadguru Nathane Vaa Vaa Vaa", "https://youtu.be/LstmAIJi1rY?t=692"], ["Lord Sathya Sai Bhagawan Sathya Sai", "https://youtu.be/LstmAIJi1rY?t=875"], ["Jaya Sai Rama Jaya Raghu Rama", "https://youtu.be/LstmAIJi1rY?t=1011"], ["Shiva Shiva Shambho Tandava Priyakara", "https://youtu.be/LstmAIJi1rY?t=1282"], ["Sharade Jaya Sharade Vaagvilasini Sharade", "https://youtu.be/LstmAIJi1rY?t=1438"], ["Om Namah Shivaya Om Namah Shivaya", "https://youtu.be/LstmAIJi1rY?t=1648"], ["Sri Vasudeva Narayana Sai Narayana", "https://youtu.be/LstmAIJi1rY?t=1860"], ["Sarva Dharma Swaroopa Sai", "https://youtu.be/LstmAIJi1rY?t=2126"], ["Pranam Sweekar Karo Sai Mahadeva", "https://youtu.be/LstmAIJi1rY?t=2390"], ["Mangala Kaarini Jai Sai Maa", "https://youtu.be/LstmAIJi1rY?t=2698"], ["Sai Baba Tera Naam Sathya Sai Baba Tera Naam", "https://youtu.be/LstmAIJi1rY?t=2951"], ["Govinda Hari Gopala Hari Radha Ramana Hari Govinda", "https://youtu.be/LstmAIJi1rY?t=3325"], ["Narayana Hari Naama Bhajo", "https://youtu.be/LstmAIJi1rY?t=3631"], ["Krishna Sri Hari Krishna", "https://youtu.be/K27_rUnvQWk?t=0"], ["Hey Parthi Purisha Prasanthi Vasa Sai Murari", "https://youtu.be/K27_rUnvQWk?t=200"], ["Pavana Suta Hanuman Ki Jai", "https://youtu.be/K27_rUnvQWk?t=454"], ["Jaya Jaya Raghu Nandana Jaya Janaki Jeevana", "https://youtu.be/K27_rUnvQWk?t=610"], ["Bhaja Mana Raghava Hey Bhaja Mana Raghava Rama", "https://youtu.be/K27_rUnvQWk?t=875"], ["Jaya Durga Devi Bhavani", "https://youtu.be/K27_rUnvQWk?t=1116"], ["Arunachala Shiva Arunachala Shiva Arunachala Shiva Aruna Shiva", "https://youtu.be/K27_rUnvQWk?t=1353"], ["Gowri Nathaya Vishwanathaya", "https://youtu.be/K27_rUnvQWk?t=1621"], ["Bhaktho Ne Hai Aaj Pukara Aana Hoga Tumhai", "https://youtu.be/K27_rUnvQWk?t=1941"], ["Karunamayi Hridayeshwari", "https://youtu.be/K27_rUnvQWk?t=2346"], ["Jaya Panduranga Prabho Vitthala", "https://youtu.be/K27_rUnvQWk?t=2562"], ["Sri Annapurne Sada Annapurne", "https://youtu.be/K27_rUnvQWk?t=2920"], ["Krishna Murari Bhava Bhaya Haari Hey Giridhari Gopal", "https://youtu.be/K27_rUnvQWk?t=3170"], ["Panduranga Panduranga Vitthala Pahe", "https://youtu.be/K27_rUnvQWk?t=3375"], ["Bolo Bolo Sab Mil Bolo Om Namah Shivaya", "https://youtu.be/K27_rUnvQWk?t=3582"], ["Jaya Jaya Gajanana Gananatha", "https://youtu.be/1qg52dkBBhg?t=0"], ["Nanda Kishora Navaneetha Chora Sai Gopala", "https://youtu.be/1qg52dkBBhg?t=250"], ["Hey Rama Narayana", "https://youtu.be/1qg52dkBBhg?t=467"], ["Sundara Vadani Suguna Manohari", "https://youtu.be/1qg52dkBBhg?t=699"], ["Rama Sumira Man Rama Sumira Man", "https://youtu.be/1qg52dkBBhg?t=965"], ["Vanamali Vasudeva Jaganmohana Radha Ramana", "https://youtu.be/1qg52dkBBhg?t=1235"], ["Shiva Shiva Hara Hara Bhola Maheshwara Shambho Maheshwara", "https://youtu.be/1qg52dkBBhg?t=1393"], ["Namah Parvati Pathaye Hara Hara", "https://youtu.be/1qg52dkBBhg?t=1689"], ["Hum Sab Milkar Mangal Gaaye", "https://youtu.be/1qg52dkBBhg?t=1921"], ["Mata Jagadambe", "https://youtu.be/1qg52dkBBhg?t=2258"], ["Radha Rasikavara Raasa Vihara", "https://youtu.be/1qg52dkBBhg?t=2525"], ["Hey Krishna Hey Krishna", "https://youtu.be/1qg52dkBBhg?t=2740"], ["Om Sahasra Roopa Saisha", "https://youtu.be/1qg52dkBBhg?t=2976"], ["Dasharatha Nandana Sri Ramachandra Dharma Samrakshaka Ram", "https://youtu.be/1qg52dkBBhg?t=3171"], ["Kalatheethaya Siddhi Roopaya Yogeshwaraya Namo", "https://youtu.be/1qg52dkBBhg?t=3438"], ["Aa Gaye Baba Ji Tvadde Naam De Bhikhari", "https://youtu.be/DBHyBIFWFzc?t=0"], ["Jai Jai Prabhu Giridhari Natavara Nandalala", "https://youtu.be/DBHyBIFWFzc?t=320"], ["Om Namah Shivaya Shivaya Namah Om", "https://youtu.be/DBHyBIFWFzc?t=555"], ["Raasa Vilola Nandalala", "https://youtu.be/DBHyBIFWFzc?t=859"], ["Ambe Jagadambe Kali Ambe Jagadambe", "https://youtu.be/DBHyBIFWFzc?t=1042"], ["Easwaramba Priya Nandana", "https://youtu.be/DBHyBIFWFzc?t=1372"], ["Shivaya Namah Shiva Shivaya Namah Shiva", "https://youtu.be/DBHyBIFWFzc?t=1632"], ["Hari Narayana Hari Narayana Hari Narayana Bhajore", "https://youtu.be/DBHyBIFWFzc?t=1769"], ["Sri Rama Jaya Rama Jaya Jaya Rama", "https://youtu.be/DBHyBIFWFzc?t=2126"], ["Ranga Panduranga Jai Jai Vitthala", "https://youtu.be/DBHyBIFWFzc?t=2378"], ["Swaminatha Sai Karuna Sindhu Pahi", "https://youtu.be/DBHyBIFWFzc?t=2599"], ["Mata Rani Teri Jai Jai Kaar Ambe Rani Teri Jai Jai Kaar", "https://youtu.be/DBHyBIFWFzc?t=2822"], ["Bhasma Vibhushitha Bhavani Shankara", "https://youtu.be/DBHyBIFWFzc?t=2977"], ["Jai Jai Ram Jai Sai Ram", "https://youtu.be/DBHyBIFWFzc?t=3124"], ["Shambho Shankara Deva", "https://youtu.be/DBHyBIFWFzc?t=3410"], ["Group Bhajan Medley", "https://youtu.be/DBHyBIFWFzc?t=3757"], ["Swami's Bhajan Medley", "https://youtu.be/DBHyBIFWFzc?t=4837"], ["Asatoma Sad Gamaya", "https://youtu.be/DBHyBIFWFzc?t=5306"], ["Closing Remarks by Bro. Ashish Sonde", "https://youtu.be/DBHyBIFWFzc?t=5428"], ["Maha Mangala Aarti", "https://youtu.be/DBHyBIFWFzc?t=6358"], ["Thought For The Day", "https://youtu.be/DBHyBIFWFzc?t=6690"]]


function App() {
  // create row per agab_bhajans
  let rows = []
  for (let i = 0; i < agab_bhajans.length; i++) {
    rows.push(<tr><td>{agab_bhajans[i][0]}</td><td>{agab_bhajans[i][1]}</td></tr>)
  }
  return (
    <body>
      <div>
        <BhajanTable elements={agab_bhajans} />
      </div>
    </body>

  );
}

class BhajanTable extends React.Component {
  state = {filterStr: ""}
  render () {
    const { elements } = this.props;
    const { filterStr } = this.state;
    
    const results = fuzzysort.go(filterStr, elements, {all: true, key: '0'})
    console.log(results)
    const filteredElements = results
      .map(e => <tr><td><a href={e.obj[1]}>{e.obj[0]}</a></td></tr>)

    return (
      <div>
        <input
          type="text"
          value={ filterStr }
          onChange={ e => this.setState({ filterStr: e.target.value }) } />
        <table>
          { filteredElements }
        </table>
      </div>
    );
  }
}

export default App;
