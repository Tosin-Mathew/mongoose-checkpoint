const connectDB = require('./db/connection');
const Person = require('./models/Person');

// Connect to database
connectDB();

// Function to demonstrate all operations
const demonstrateOperations = async () => {
  try {
    console.log('=== Starting Mongoose Operations ===\n');

    // 1. Create and Save a Record of a Model
    console.log('1. Creating and saving a single person...');
    const person = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['pizza', 'pasta', 'salad']
    });

    const savedPerson = await person.save();
    console.log('Saved person:', savedPerson);
    console.log('---\n');

    // 2. Create Many Records with model.create()
    console.log('2. Creating multiple people...');
    const arrayOfPeople = [
      {
        name: 'Alice Smith',
        age: 25,
        favoriteFoods: ['sushi', 'ice cream']
      },
      {
        name: 'Bob Johnson',
        age: 35,
        favoriteFoods: ['burger', 'steak', 'pizza']
      },
      {
        name: 'Carol Davis',
        age: 28,
        favoriteFoods: ['pasta', 'salad', 'sushi']
      },
      {
        name: 'John Doe', // Duplicate name for testing find
        age: 40,
        favoriteFoods: ['tacos', 'burritos']
      }
    ];

    const createdPeople = await Person.create(arrayOfPeople);
    console.log(`Created ${createdPeople.length} people`);
    console.log('---\n');

    // 3. Use model.find() to Search Your Database
    console.log('3. Finding all people named "John Doe"...');
    const peopleNamedJohn = await Person.find({ name: 'John Doe' });
    console.log(`Found ${peopleNamedJohn.length} people named John Doe:`);
    peopleNamedJohn.forEach((p, index) => {
      console.log(`${index + 1}. ${p.name}, Age: ${p.age}`);
    });
    console.log('---\n');

    // 4. Use model.findOne() to Return a Single Matching Document
    console.log('4. Finding one person who likes pizza...');
    const pizzaLover = await Person.findOne({ favoriteFoods: 'pizza' });
    if (pizzaLover) {
      console.log('Found pizza lover:', pizzaLover.name);
      console.log('All favorite foods:', pizzaLover.favoriteFoods);
    } else {
      console.log('No pizza lovers found');
    }
    console.log('---\n');

    // 5. Use model.findById() to Search Your Database By _id
    console.log('5. Finding person by ID...');
    if (savedPerson._id) {
      const personById = await Person.findById(savedPerson._id);
      if (personById) {
        console.log('Found person by ID:', personById.name);
      } else {
        console.log('Person not found by ID');
      }
    }
    console.log('---\n');

    // 6. Perform Classic Updates by Running Find, Edit, then Save
    console.log('6. Updating person by adding "hamburger" to favorite foods...');
    
    // Method 1: Using findById, then save
    const personToUpdate = await Person.findById(savedPerson._id);
    if (personToUpdate) {
      personToUpdate.favoriteFoods.push('hamburger');
      const updatedPerson = await personToUpdate.save();
      console.log('Updated person favorite foods:', updatedPerson.favoriteFoods);
    }

    console.log('---\n');

    // Additional: Demonstrate other useful operations
    console.log('7. Additional Operations - Finding all people...');
    const allPeople = await Person.find({});
    console.log(`Total people in database: ${allPeople.length}`);
    
    allPeople.forEach((p, index) => {
      console.log(`${index + 1}. ${p.name}, Age: ${p.age}, Foods: [${p.favoriteFoods.join(', ')}]`);
    });

  } catch (error) {
    console.error('Error during operations:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('\n=== Database connection closed ===');
  }
};

// Start the demonstration
setTimeout(demonstrateOperations, 2000); // Wait for DB connection to establish
