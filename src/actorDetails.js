// function getActor(name){
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': '14139c2639mshda72e9ec6892335p136fa8jsnc5045234df25',
//         'X-RapidAPI-Host': 'celebrity-by-api-ninjas.p.rapidapi.com'
//       }
//     };
    
//     return fetch(`https://celebrity-by-api-ninjas.p.rapidapi.com/v1/celebrity?name=${name}`, options)
//       .then(response => response.json())
// }

// getActor(actorName)
// .then((actor) => {
//   document.querySelector('h1').textContent = actor.name;

// })
// .catch(err => console.error(err));