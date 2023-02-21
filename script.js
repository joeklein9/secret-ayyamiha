let people = [
    {
        name: "Haven",
        age: 5,
        household: "1329",
        isPaired: false
    },
    
    {
        name: "Nova",
        age: 3,
        household: "1329",
        isPaired: false
    },
    
    {
        name: "Jennifer",
        age: 31,
        household: "1329",
        isPaired: false
    },
    
     {
        name: "Joseph",
        age:30,
        household: "1329",
        isPaired: false
    },
    
    {
        name: "Badi",
        age: 6,
        household: "1337",
        isPaired: false
    },
    
     {
        name: "Zayn",
        age: 3,
        household: "1337",
        isPaired: false
    },
    
    {
        name: "Nabil",
        age: 35,
        household: "1337",
        isPaired: false
    },
    
    {
        name: "Jasmine",
        age: 36,
        household: "1337",
        isPaired: false
    },
    
     {
        name: "Enoch",
        age: 4, 
        household: "1345",
        isPaired: false
    },
    
    {
        name: "Layli",
        age: 6, 
        household: "1345",
        isPaired: false
    },
    
    {
        name: "Richard",
        age: 36, 
        household: "1345",
        isPaired: false
    },
    
    {
        name: "Carmel",
        age: 35, 
        household: "1345",
        isPaired: false
    }, 
    
    {
        name: "Emily",
        age: 28, 
        household: "Chapel Hill",
        isPaired: false
    },
    
    {
        name: "Mahin",
        age: 65,
        household: "Cary",
        isPaired: false
    
    }
]


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function isValidAdultRecipient(giver, recipient) {
    // Check that recipient is not the same as giver
    if (recipient === giver) {
      return false;
    }
    // Check that recipient is an adult
    if (recipient.age < 18) {
      return false;
    }
    // Check that recipient is not from the same household as giver
    if (recipient.household === giver.household) {
      return false;
    }
    return true;
  }
  
  function isValidChildRecipient(giver, recipient) {
    // Check that recipient is not the same as giver
    if (recipient === giver) {
      return false;
    }
    // Check that recipient is a child
    if (recipient.age >= 18) {
      return false;
    }
    // Check that recipient is not from the same household as giver
    if (recipient.household === giver.household) {
      return false;
    }
    return true;
  }
  
  function pairPeople(people) {
    // Separate people into adults and children
    const adults = people.filter(person => person.age >= 18);
    const children = people.filter(person => person.age < 18);
  
    // Create a copy of the people array to use as a pool of eligible recipients
    const eligibleRecipients = people.slice();
  
    // Shuffle the array of eligible recipients
    shuffleArray(eligibleRecipients);
  
    // Pair adults first
    const adultPairs = [];
    for (let i = 0; i < adults.length; i++) {
      const giver = adults[i];
      let recipient = null;
      // Loop through the eligible recipients until a valid recipient is found
      for (let j = 0; j < eligibleRecipients.length; j++) {
        if (isValidAdultRecipient(giver, eligibleRecipients[j])) {
          recipient = eligibleRecipients[j];
          eligibleRecipients.splice(j, 1); // remove recipient from the pool
          break;
        }
      }
      // If a valid recipient is found, add the pair to the result
      if (recipient) {
        adultPairs.push({ giver, recipient });
      } else {
          alert ("Couldn't find an eligible recipient for the remaining givers - refresh and try again!")
        throw new Error("Could not find eligible recipient for remaining givers");
          
      }
    }
  
    // Pair children next
    const childPairs = [];
    for (let i = 0; i < children.length; i++) {
      const giver = children[i];
      let recipient = null;
      // Loop through the eligible recipients until a valid recipient is found
      for (let j = 0; j < eligibleRecipients.length; j++) {
        if (isValidChildRecipient(giver, eligibleRecipients[j])) {
          recipient = eligibleRecipients[j];
          eligibleRecipients.splice(j, 1); // remove recipient from the pool
          break;
        }
      }
      // If a valid recipient is found, add the pair to the result
      if (recipient) {
        childPairs.push({ giver, recipient });
      } else {
          alert ("Couldn't find an eligible recipient for the remaining givers - refresh and try again!")
        throw new Error("Could not find eligible recipient for remaining givers");
          
      }
    }
  
    // Combine the adult pairs and child pairs into one array
    const pairs = adultPairs.concat(childPairs);

    pairs.forEach(pair => {
        document.getElementById("results-container").innerHTML += `<li>🎁 ${pair.giver.name} will give a gift to <span class="covered" style = "font-weight:bold" style>${pair.recipient.name}</span>`;
      });
  
    return pairs;
    
  }

  pairPeople(people)
  console.log(pairPeople(people))


const coveredRecipients = document.querySelectorAll(".covered");

coveredRecipients.forEach(recipient => {
  recipient.addEventListener("click", () => {
    recipient.classList.remove("covered");
    setTimeout(function () {
      recipient.classList.add("covered");
    }, 3000);
  });
});


