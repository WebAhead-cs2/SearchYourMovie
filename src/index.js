const searchBtn = document.getElementById('searchBtn');
const actorsUL = document.getElementById('actorsList');
//const getMoviesArr = require('../moviesList');
let searchTxt = '';
let actorName = '';
let actors;
searchBtn.addEventListener('click', getText);
function getText() {
  //document.querySelector('h1').classList.toggle('hide');
  actors = [];
  searchTxt = document.getElementById('searchInput').value;
  searchTxt = searchTxt.replaceAll(' ', '+');
  console.log(searchTxt);
  getMovie(searchTxt)
    .then((movie) => {
      console.log(movie);
      document.querySelector('h1').textContent = '';
      // get movie properties and show them on html via DOM >>>
      document.querySelector('h2').textContent = movie.Title;
      if(movie.Released !== 'N/A'){
        document.getElementById('date').textContent = movie.Released;
      } else{
        document.getElementById('date').textContent = ''; 
      }
      

      // get the Runtime of the movie, parse it to a number, then get hours and minutes >>>
      if(movie.Runtime !== 'N/A'){
        const runTime = parseInt(movie.Runtime.slice(0, movie.Runtime.indexOf(' ')));
        const hrs = Math.floor(runTime/60);
        const mins = runTime%60;
        document.getElementById('runTime').textContent = hrs + 'h ' + mins + 'm';
      } else{
        document.getElementById('runTime').textContent = ''
      }

      if(movie.Poster !== null){
        document.querySelector('img').src = movie.Poster;
      } else{
        document.querySelector('img').src = '/src/noImage.jpg';
      }
      if (movie.Plot !== 'N/A') {
        document.getElementById('plot').textContent = movie.Plot;
      } else{
        document.getElementById('plot').textContent = ''
      }
      if (movie.Director !== 'N/A') {
        document.getElementById('directortx').textContent = "Director:  ";
        document.getElementById('director').textContent = movie.Director;

      } else{
        document.getElementById('director').textContent = ''
      }
      
      if (movie.Writer !== 'N/A') {
        document.getElementById('writertx').textContent = "Writer:  ";
        document.getElementById('writer').textContent = movie.Writer;
      } else{
        document.getElementById('writer').textContent = ''
      }
      
      if(movie.Actors !== 'N/A'){
        document.getElementById('boldStars').textContent = 'Stars '
        //actorsUL.innerHTML = '<b>stars </b>';
        // get actors name from json, convert it to array >>>
        actors = movie.Actors.split(", ");
        // make unOrdered list to show the actors Name >>>
        
        for(let actor of actors){
          
          actorName = actor.replaceAll(' ', '%20');
          console.log(actorName);
          const a = document.createElement('a');
          a.setAttribute('id', 'actorLink');
          const item = document.createElement('span');
          item.setAttribute('id', 'actorName');
          item.textContent = actor;
          a.appendChild(item);
          a.href = '/src/actorDetails.html';
          //a.target = '_blank';
          // a.addEventListener('click', getActor(actorName)
          // .then((actor) => {
          //   document.getElementById('actorName').textContent = actor.name;
          
          // })
          // .catch((err) => console.log(err)));
          actorsUL.appendChild(a);
        }
        console.log(actors);
      } else{
        const nothing = document.createElement('span');
        nothing.textContent = '';
        actorsUL.appendChild(nothing);
      }
      if(movie.Genre !== 'N/A'){
        document.getElementById('genre').textContent = movie.Genre;
      }
      if(movie.Awards !== 'N/A'){
        document.getElementById('awards').textContent = movie.Awards;
        document.getElementById('awardsx').textContent = "awards:  ";
      }
      else{
        document.getElementById('awards').textContent = '';
        document.getElementById('awardsx').textContent = "";
      }
      if (movie.BoxOffice !== 'N/A') {
        document.getElementById('boxOfficetx').textContent = "BoxOffice:  ";
        document.getElementById('boxoffice').textContent = movie.BoxOffice;
      } else{
        document.getElementById('boxoffice').textContent = ''
      }
    })
    .catch((err) => {
      console.log("hi from error: " + err);
      document.querySelector('h1').textContent = 'Movie Not Found, seach another one..'
      // document.getElementsByClassName('inBox').array.forEach(element => {
      //   element.style('visibilty') = 'hidden';
      // });
      // document.querySelector('h2').style('visibilty') = 'hidden';
      // document.querySelector('h4').style('visibilty') = 'hidden';
      // document.getElementById('runTime').style('display') = 'none';
      // document.querySelector('img').style('display') = 'none';
      // document.getElementById('details').style('visibilty') = 'hidden';
    });
  return searchTxt;
}

//console.log(actors[2]);

function getMovie(movieName) {
  return fetch(`https://www.omdbapi.com/?apikey=9494bca&t=${movieName}&plot=full`)
  .then((response) => response.json());
}

function getActor(name){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '14139c2639mshda72e9ec6892335p136fa8jsnc5045234df25',
      'X-RapidAPI-Host': 'celebrity-by-api-ninjas.p.rapidapi.com'
    }
  };
  
  return fetch(`https://celebrity-by-api-ninjas.p.rapidapi.com/v1/celebrity?name=${name}`, options)
  .then(response => response.json())
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].toString().substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed, decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", (e) => {
    closeAllLists(e.target);
  });
}

const moviesList = ["The Shawshank Redemption", "The Godfather", "Pulp Fiction", "The Godfather Part II", "Inception", "The Lord of the Rings: The Return of the King", "Star Wars", "The Lord of the Rings: The Fellowship of the Ring", "The Matrix", "Se7en", "Amélie", "Terminator 2: Judgment Day", "The Walking Dead", "Zombieland", "Shaun of the Dead", "I Am Legend", "The Crazies", "Grindhouse", "28 Days Later...", "28 Weeks Later", "Resident Evil: Extinction", "Dawn of the Dead", "Resident Evil", "Planet Terror", "Army of Darkness", "Resident Evil: Apocalypse", "Doom", "Braindead", "Land of the Dead", "Dawn of the Dead", "Night of the Living Dead", "Quarantine", "Survival of the Dead", "Diary of the Dead", "Pet Sematary", "The Return of the Living Dead", "Day of the Dead", "Black Swan", "The Green Hornet", "xXx", "The Hangover", "Night of the Living Dead", "The Fast and the Furious: Tokyo Drift", "A Clockwork Orange", "Aliens", "Requiem for a Dream", "The Prestige", "Reservoir Dogs", "Back to the Future", "Monty Python and the Holy Grail", "The Green Mile", "Braveheart", "2001: A Space Odyssey", "Der Untergang", "Gladiator", "Inglourious Basterds", "Harry Potter and the Deathly Hallows: Part 1", "The Dark Knight", "The Mechanic", "The Social Network", "Avatar", "Scott Pilgrim vs. the World", "Kick-Ass", "Due Date", "The Other Guys", "Twilight", "Fight Club", "Batman Begins", "Die Hard", "Hotel Rwanda", "Heat", "Jaws", "Snatch", "No Country for Old Men", "The Lion King", "The Big Lebowski", "Donnie Darko", "Into the Wild", "The Sixth Sense", "District 9", "Gone with the Wind", "Kill Bill: Vol. 1", "Toy Story", "Scarface", "2 Fast 2 Furious", "The Departed", "Pirates of the Caribbean: The Curse of the Black Pearl", "Iron Man 2", "Machete", "The Expendables", "Salt", "The Sorcerer's Apprentice", "Alice in Wonderland", "Harry Potter and the Sorcerer's Stone", "Grown Ups", 300, "The Wrestler", "Gandhi", "The Terminator", "Twelve Monkeys", "Good Will Hunting", "Lֳ¥t den rֳ₪tte komma in", "The Exorcist", "Rocky", "Big Fish", "Beauty and the Beast", "Mystic River", "Shutter Island", "Buried", "The Bank Job", "Robin Hood", "Saving Private Ryan", "A Perfect Getaway", "Sherlock Holmes", "Sin City", "Harry Potter and the Half-Blood Prince", "Star Wars: Episode I - The Phantom Menace", "X-Men Origins: Wolverine", "Watchmen", "The Book of Eli", "Prince of Persia: The Sands of Time", "Shrek Forever After", "Predators", "Superbad", "American Pie", "Scream", "The Empire Strikes Back", "Finding Nemo", "Love Actually", "The Incredible Hulk", "Harry Potter and the Goblet of Fire", "A Nightmare on Elm Street", "I Spit on Your Grave", "Troy", "Star Wars: Episode III - Revenge of the Sith", "Percy Jackson & the Olympians: The Lightning Thief", "Knocked Up", "Juno", "X-Men", "Zack and Miri Make a Porno", "Law Abiding Citizen", "American Psycho", "Young People Fucking", "X-Men: The Last Stand", "The Road", "Public Enemies", "Live Free or Die Hard", "Wanted", "The Lord of the Rings: The Two Towers", "Forgetting Sarah Marshall", "The Pianist", "Tropic Thunder", "Death Race", "Alien", "The Last Airbender", "Stardust", "Day of the Dead", "Fido", "Wedding Crashers", "The Day the Earth Stood Still", "Star Wars: Episode VI - Return of the Jedi", "Jurassic Park", "Role Models", "The Curious Case of Benjamin Button", "The Boy in the Striped Pajamas", "Harry Potter and the Chamber of Secrets", "Star Wars: Episode II - Attack of the Clones", "Million Dollar Baby", "The Devil Wears Prada", "The 40 Year Old Virgin", "Tekken", "P.S. I Love You", "Paranormal Activity 2", "Gangs of New York", "The Bourne Identity", "Dear John", "Ghost Rider", "Catch Me If You Can", "Paranormal Activity", "Jumper", "Blow", "Hot Fuzz", "Hancock", "Case 39", "Conan the Barbarian", "Dumb and Dumber", "Sweeney Todd: The Demon Barber of Fleet Street", "National Treasure", "Daybreakers", "Shooter", "Mortal Kombat", "The Illusionist", "Spider-Man 2", "The Butterfly Effect", "Pearl Harbor", "Superman", "Batman", "Saw 3D", "Inside Man", "Return of the Living Dead: Part II", "Planet of the Apes", "The Bourne Supremacy", "Cloverfield", "Scream 3", "Orphan", "Angels & Demons", "Team America: World Police", "Scream 2", "Training Day", "Hitman", "Underworld", "Predator", "Shrek", "Running Scared", "The Dead Next Door", "Kill Bill: Vol. 2", "Saw", "From Dusk Till Dawn", "Zodiac", "Yes Man", "Fantastic Four", "The Matrix Reloaded", "The Italian Job", "Eagle Eye", "The Day After Tomorrow", "17 Again", "Man on Fire", "Lord of War", "Remember the Titans", 21, "Moulin Rouge!", "New Kids Turbo", "The Haunted Mansion", "X2", "The Da Vinci Code", "Ocean's Thirteen", "8 Mile", "Collateral", "The Chronicles of Riddick", "Perfume: The Story of a Murderer", "Get Smart", "Charlie and the Chocolate Factory", "National Treasure: Book of Secrets", "Starship Troopers", "The Devil's Advocate", "I, Robot", "Scary Movie", "True Lies", "Twister", "Mulan", "Untraceable", "Transporter 2", "Rush Hour", "Saw VI", "Mad Max", "Final Destination 2", "Ghost Town", "Flightplan", "Street Kings", "Rambo", "Pet Sematary II", "A Knight's Tale", "The Ring", "Babel", "Alexander", "Not Another Teen Movie", "The Tournament", "The Last Samurai", "Underworld: Rise of the Lycans", "Hitch", "What Happens in Vegas", "Edward Scissorhands", "The Bucket List", "King Kong", "Rise of the Silver Surfer", "The Holiday", "Ocean's Twelve", "Terminator 3: Rise of the Machines", "War of the Worlds", "Munich", "Hulk", "Click", "Beowulf", "The Matrix Revolutions", "Batman Forever", "The Patriot", "The Transporter", "Bad Boys", "Hooligans", "The Mist", "Friday the 13th", "The Godfather Part III", "Toy Story 2", "King Arthur", "Insomnia", "Crank", "Gone in Sixty Seconds", "50 First Dates", "Vanilla Sky", "The Perfect Storm", "Crank: High Voltage", "Blade", "You Don't Mess with the Zohan", "30 Days of Night", "Men in Black", "Step Up", "The Kingdom", "National Lampoon's Van Wilder", "The Box", 1408, "Transporter 3", "Total Recall", "Austin Powers: International Man of Mystery", "Legally Blonde", "Mission: Impossible III", "Meet the Fockers", "There's Something About Mary", "Natural Born Killers", "Austin Powers in Goldmember", "Eragon", "Apollo 13", "Be Cool", "Grease 2", "Dodgeball: A True Underdog Story", "Dogma", "Signs", "The Punisher", "Road Trip", "Bad Boys II", "The Prince & Me", "The Royal Tenenbaums", "Evan Almighty", "The Others", "The Golden Compass", "The Untouchables", "The Longest Yard", "Chocolat", "Donnie Brasco", "Notting Hill", "10,000 BC", "Shrek the Third", "Finding Neverland", "El orfanato", "Big Daddy", "A Series of Unfortunate Events", "The Strangers", "Alien Resurrection", "The Hitchhiker's Guide to the Galaxy", "The Final Destination", "Jackie Brown", "Anger Management", "A Man Apart", "Just Like Heaven", "The Hot Chick", "Batman & Robin", "Next", "Blade: Trinity", "Van Helsing", "American Pie 2", "Monster", "I Now Pronounce You Chuck & Larry", "American Wedding", "Robin Hood: Prince of Thieves", "The Parent Trap", "Hostel", "The Hills Have Eyes", "The Last of the Mohicans", "Dragonball Evolution", "The Amityville Horror", "The Simpsons Movie", "Batman Returns", "White Chicks", "Shrek 2", "Night at the Museum", "The Wedding Singer", "Bruce Almighty", "Spaceballs", "The International", "Die Hard: With a Vengeance", "Austin Powers: The Spy Who Shagged Me", "Desperado", "The Sweetest Thing", "Underworld: Evolution", "RoboCop", "The Mask", "Charlie's Angels", "Black Dynamite", "Men in Black II", "Antz", "World Trade Center", "Shallow Hal", "The Evil Dead", "Memoirs of a Geisha", "About a Boy", "Die Another Day", "The Lost World: Jurassic Park", "We Were Soldiers", "Mortal Kombat: Annihilation", "Madagascar: Escape 2 Africa", "Walking Tall", "Die Hard 2", "The Nightmare Before Christmas", "Stargate", "Bridget Jones's Diary", "From Hell", "Daredevil", "Lara Croft: Tomb Raider", "Mission: Impossible", "Jay and Silent Bob Strike Back", "The Terminal", "Along Came Polly", "The Devil's Rejects", "Banlieue 13: Ultimatum", "The Mummy Returns", "Alienֲ³", "Mrs. Doubtfire", "The Dukes of Hazzard", "Clerks II", "The Abyss", "Scary Movie 2", "Mary Poppins", "Coach Carter", "Police Academy", "Cube", "Clerks", "Zwartboek", "Final Destination 3", "Corpse Bride", "The Texas Chainsaw Massacre", "Halloween", "What Lies Beneath", "Snakes on a Plane", "G-Force", "The Black Dahlia", "The World Is Not Enough", "Rat Race", "Final Destination", "Brֳ¼no", "Jurassic Park III", "Disaster Movie", "The Exorcism of Emily Rose", "The Skeleton Key", "Lethal Weapon", "Dude, Where's My Car?", "Over the Hedge", "Cheaper by the Dozen", "13 Going on 30", "Planet of the Apes", "Jumanji", "Deep Impact", "Pocahontas", "Wild Hogs", "Alice in Wonderland", "Four Rooms", "The Ruins", "Happy Feet", "Mission: Impossible II", "Elf", "The Hills Have Eyes II", "What Women Want", "Oorlogswinter", "Dreamcatcher", "Epic Movie", "Gremlins", "Miss Congeniality", "John Q", "Spy Kids", "Saw II", "Did You Hear About the Morgans?", "DOA: Dead or Alive", "Catwoman", "Scary Movie 3", "Freaky Friday", "Beverly Hills Cop", "AVPR: Aliens vs Predator - Requiem", "Tomorrow Never Dies", "Alien vs. Predator", "What a Girl Wants", "Evil Dead II", "My Bloody Valentine", "Passengers", "I Know What You Did Last Summer", "The Texas Chainsaw Massacre: The Beginning", "Paycheck", "Starsky & Hutch", "The Princess Diaries 2: Royal Engagement", "Mad Max 2", "Tarzan", "Miami Vice", "Shark Tale", "The Time Machine", "The Grudge", "Freddy vs. Jason", "Behind Enemy Lines", "Saw V", "Runaway Jury", "The Eye", "Romeo Must Die", "Rules of Engagement", "Analyze That", "Get Carter", "Freddy Got Fingered", "Transformers", "Hostel: Part II", "Beerfest", "The Condemned", "Predator 2", "How the Grinch Stole Christmas", "The Wicker Man", "Assault on Precinct 13", "Robots", "Mr. Deeds", "Superhero Movie", "Lilo & Stitch", "Saw IV", "40 Days and 40 Nights", "Rambo: First Blood Part II", "Enter the Dragon", "The Addams Family", "The Spiderwick Chronicles", "Elektra", "8MM", "ֳ†on Flux", "Joy Ride", "Space Jam", "Goldfinger", "How High", "Home Alone 2: Lost in New York", "Flash Gordon", "The Naked Gun: From the Files of Police Squad!", "Conan the Destroyer", "Semi-Pro", "Ghostbusters II", "Deep Blue Sea", "Surf's Up", "My Sassy Girl", "In Her Shoes", "The X Files: I Want to Believe", "Evolution", "Dr. No", "You, Me and Dupree", "The Wedding Planner", "Nanny McPhee", "Thir13en Ghosts", "Lara Croft Tomb Raider: The Cradle of Life", "Gothika", "Mr. Bean's Holiday", "Fun with Dick and Jane", "Psycho", "The Polar Express", "Rambo III", "Friday the 13th", "The Rookie", "Universal Soldier", "The Family Man", "Bad Santa", "Che: Part One", "Rampage", "The Long Kiss Goodnight", "The Hunchback of Notre Dame", "Hide and Seek", "101 Dalmatians", "Analyze This", "Under Siege", "Wayne's World 2", "Good Bye Lenin!", "Bedazzled", "Final Fantasy: The Spirits Within", "Live and Let Die", "A View to a Kill", "Two for the Money", "Flight of the Phoenix", "Sister Act 2: Back in the Habit", "Johnny English", "Post Grad", "The Eye", "Kingpin", "Super Mario Bros.", "The Whole Ten Yards", "Peter Pan", "Windtalkers", "Fainaru fantajֳ® sebun adobento chirudoren", "Stuart Little", "Jeepers Creepers", "Deuce Bigalow: Male Gigolo", "Knockaround Guys", "The Messengers", "Cool Runnings", "Norbit", "Open Season 2", "Far Cry", "Lethal Weapon 2", "Moonraker", "Never Say Never Again", "Goal!", "Ali G Indahouse", "Dinosaur", "Alone in the Dark", "Pinocchio", "Stan Helsing", "Big Momma's House", "Conspiracy Theory", "Naked Gun 33 1/3: The Final Insult", "Octopussy", "Torque", "Jaws: The Revenge", "Home Alone 3", "He Got Game", "Shaft", "Babe", "The Gift", "Cheaper by the Dozen 2", "The Texas Chain Saw Massacre", "Looney Tunes: Back in Action", "The Reaping", "The Ring Two", "Collateral Damage", "The Longest Day", "The SpongeBob SquarePants Movie", "Raise Your Voice", "The Naked Gun 2ֲ½: The Smell of Fear", "White Men Can't Jump", "Mindhunters", "The Forgotten", "Monster House", "Baiohazֳ¢do: Dijenerֳ×shon", "Police Academy 4: Citizens on Patrol", "Street Fighter", "Bride & Prejudice", "About Schmidt", "Employee of the Month", "Brother Bear", "Dumbo", "The Karate Kid Part II", "Kiss of the Dragon", "Crocodile Dundee", "Escape from L.A.", "Joan of Arc", "The Fox and the Hound", "Bandidas", "Big Momma's House 2", "Lethal Weapon 3", "Escape from Alcatraz", "Deuce Bigalow: European Gigolo", "Taxi", "Black Sheep", "Imagine That", "Over Her Dead Body", "Mad Max Beyond Thunderdome", "Coneheads", "Lady and the Tramp", "The Butterfly Effect 3: Revelations", "Charlotte's Web", "The Butterfly Effect 2", "Jaws 2", "Glory Road", "Scooby-Doo 2: Monsters Unleashed", "RoboCop 2", "Mean Machine", "Don't Say a Word", "Garfield", "Small Soldiers", "Taxi", "Femme Fatale", "Daddy Day Care", "Blue Streak", "The Cat in the Hat", "Cats & Dogs", "Baise-moi", "Beverly Hills Cop II", "Dragonfly", "Captivity", "Bride of Chucky", "Cube 2: Hypercube", "Ginger Snaps", "Strange Wilderness", "The Hunted", "Ladder 49", "Bulletproof Monk", "Bean", "Jason X", "Cocoon", "National Security", "The Grudge 2", "I Spy", "Bubble Boy", "Changing Lanes", "Stuck on You", "Spirit: Stallion of the Cimarron", "Fucking ֳ…mֳ¥l", "Beverly Hills Ninja", "D-War", "George of the Jungle", "White Noise", "Beethoven", "Herbie Fully Loaded", "A Nightmare on Elm Street 3: Dream Warriors", "Seed of Chucky", "Bratz", "Biker Boyz", "Exorcist: The Beginning", "Dennis the Menace", "Boat Trip", "Riֲ¢hie Riֲ¢h", "Jesus Christ Superstar", "Eight Legged Freaks", "The Nutty Professor", "Swimfan", "A Goofy Movie", "Goal II: Living the Dream", "Like Mike", "Legally Blonde 2: Red, White & Blonde", "The Karate Kid Part III", "Beverly Hills Cop III", "Doctor Dolittle", "Jingle All the Way", "Jeepers Creepers 2", "Bowfinger", "Spy Kids 2: Island of Lost Dreams", "The Tuxedo", "Astֳ©rix & Obֳ©lix: Mission Clֳ©opֳ¢tre", "Open Water", "The Great Mouse Detective", "RoboCop 3", "Ravenous", "The Animatrix", "Mr. Woodcock", "The Grudge 3", "Speed 2: Cruise Control", "Gremlins 2: The New Batch", "A Nightmare on Elm Street Part 2: Freddy's Revenge", "Dance of the Dead", "The Deaths of Ian Stone", "Volcano", "Police Academy 2: Their First Assignment", "Wes Craven's New Nightmare", "The Santa Clause", "Black Knight", "Forrest Gump", "Titanic", "Memento", "American History X", "V for Vendetta", "Goodfellas", "Iron Man", "Casino Royale", "Spider-Man", "Pirates of the Caribbean: Dead Man's Chest", "Independence Day", "Ocean's Eleven", "Pirates of the Caribbean: At World's End", "Armageddon", "Harry Potter and the Prisoner of Azkaban", "Harry Potter and the Order of the Phoenix", "E.T. the Extra-Terrestrial", "Mr. & Mrs. Smith", "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", "Black Hawk Down", "Life of Brian", "The Mummy", "Quantum of Solace", "Meet the Parents", "The Aviator", 2012, "The Passion of the Christ", "Ghostbusters", "Home Alone", "Kingdom of Heaven", "Speed", "The Thing", "Pineapple Express", "Constantine", "Back to the Future Part III", "Chicago", "Death Proof", "Ice Age", "South Park: Bigger, Longer & Uncut", "Street Fighter: The Legend of Chun-Li", "Martyrs", "G.I. Joe: The Rise of Cobra", "Terminator Salvation", "Spider-Man 3", "Loft", "The Descent", "The Descent: Part 2" ];
autocomplete(document.getElementById('searchInput'), moviesList);
console.log('movie list Length : ' + moviesList.length);



