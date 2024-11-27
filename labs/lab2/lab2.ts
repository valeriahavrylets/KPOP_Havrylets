/*
enum Category {
  BusinessAnalyst = "Business analyst",
  Developer = "Developer",
  Designer = "Designer",
  QA = "QA",
  ScrumMaster = "Scrum master"
}

type Employee = {
  id: number;
  Name: string;
  surname: string;
  available: boolean;
  salary: number;
  category: Category;
};

function getAllWorkers(): Employee[] {
  return [
    { id: 1, Name: 'Ivan', surname: 'Ivanov', available: true, salary: 1000, category: Category.BusinessAnalyst },
    { id: 2, Name: 'Petro', surname: 'Petrov', available: true, salary: 1500, category: Category.Developer },
    { id: 3, Name: 'Vasyl', surname: 'Vasyliev', available: false, salary: 1600, category: Category.Designer },
    { id: 4, Name: 'Evgen', surname: 'Zhukov', available: true, salary: 1300, category: Category.QA }
  ];
}

function logFirstAvailable(workers: Employee[]): void {
  console.log(`Кількість робітників: ${workers.length}`);

  for (const worker of workers) {
    if (worker.available) {
      console.log(`Доступний робітник: ${worker.Name} ${worker.surname}`);
      break;
    }
  }
}


/!*

const employees = getAllWorkers();
logFirstAvailable(employees);
*!/


// це на виведення масиву з всіма робітниками
/!*function getAllWorkersWithCategory(): Employee[] {
  return getAllWorkers().map(employee => ({
    ...employee,
    category: employee.category
  }));
}
const workersWithCategory = getAllWorkersWithCategory();
console.log(workersWithCategory);*!/

function getWorkersNamesByCategory(category: Category): Array<string> {
  const employees = getAllWorkers();
  let workerSurnames: string[] = [];

  for (const employee of employees) {
    if (employee.category === category) {
      workerSurnames.push(employee.surname);
    }
  }

  return workerSurnames;
}



function logWorkersNames(names: string[]): void {
  for (const name of names) {
    console.log(name);
  }
}

/!*const devs = getWorkersNamesByCategory(Category.Developer);
logWorkersNames(devs);*!/

function getAllWorkersWithID(): Employee[] {
  // Створюємо робітників з унікальними ID
  return getAllWorkers().map((worker, index) => ({
    ...worker,
    id: index + 1  // Присвоюємо ID робітникам (якщо немає)
  }));
}

function logDevelopers(): void {
  const employees = getAllWorkers();

  employees.forEach(employee => {
    if (employee.category === Category.Developer) {
      console.log(`${employee.Name} ${employee.surname}`);
    }
  });
}

function getWorkerByID(id: number): string | undefined {
  const employees = getAllWorkers();
  const employee = employees.find(employee => employee.id === id);

  if (employee) {
    return `${employee.Name} ${employee.surname}, заробітна плата: ${employee.salary}`;
  } else {
    return undefined;
  }
}

/!*!// Вивести всіх розробників
logDevelopers();*!/

/!*!// Отримати інформацію про робітника за ID
const workerInfo = getWorkerByID(2);
if (workerInfo) {
  console.log(workerInfo);
} else {
  console.log("Робітника з таким ID не знайдено");
}*!/


//виводить всю інфу по робітнику
/!*function getWorkerByIDWithID(id: number): Employee | undefined {
  const workers = getAllWorkersWithID();  // Використовуємо функцію з ID
  return workers.find(worker => worker.id === id);
}
const worker = getWorkerByIDWithID(2);
console.log(worker);*!/

function createCustomerID(name: string, id: number): string {
  return `${name}${id}`;
}

/!*let myID: string = createCustomerID("Ann ", 10);
console.log(myID);  // Виведе "Ann10"*!/

let IdGenerator: (name: string, id: number) => string;

IdGenerator = (name: string, id: number): string => {
  return `${name}${id}`;
};

/!*!// Виклик стрілочної функції
console.log(IdGenerator("John", 20));  // Виведе "John20"*!/

/!*IdGenerator = createCustomerID;

console.log(IdGenerator("Mike", 30));  // Виведе "Mike30"*!/

function getAvailableWorkers(): Employee[] {
  return getAllWorkers().filter(worker => worker.available);
}

function getWorkersByIDs(workerIDs: number[]): Employee[] {
  const workers = getAllWorkersWithID();

  // Фільтруємо робітників за ID та перевіряємо їх доступність
  return workers.filter(worker => workerIDs.includes(worker.id) && worker.available);
}

function createCustomer(name: string, age?: number, city?: string): void {
  console.log(`Ім'я замовника: ${name}`);

  if (age !== undefined) {
    console.log(`Вік: ${age}`);
  }

  if (city !== undefined) {
    console.log(`Місто: ${city}`);
  }
}

/!*!// Виклики з різною кількістю параметрів
createCustomer("Ann");
createCustomer("Ann", 30);
createCustomer("Ann", 30, "Kyiv");*!/


function getWorkersNamesByCategoryWithDefault(category: Category = Category.Designer): Array<string> {
  return getWorkersNamesByCategory(category);
}

/!*
// Виклик без параметра (за замовчуванням буде обрано Category.Designer)
const designerNames = getWorkersNamesByCategoryWithDefault();
console.log(designerNames);
*!/


// Виклик без параметрів
//logFirstAvailable();
function logFirstAvailableDefault(workers: Employee[] = getAllWorkers()): void {
  console.log(`Кількість робітників: ${workers.length}`);

  for (const worker of workers) {
    if (worker.available) {
      console.log(`Доступний робітник: ${worker.Name} ${worker.surname}`);
      break;
    }
  }
}

/!*!// Виклик функції без параметра
logFirstAvailableDefault();*!/

function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
  console.log(`Замовник: ${customer}`);

  const availableWorkers: string[] = [];

  workerIDs.forEach(id => {
    const worker = getWorkerByID(id);
    if (worker) {
      const allWorkers = getAllWorkers();
      const currentWorker = allWorkers.find(w => w.id === id);

      if (currentWorker && currentWorker.available) {
        availableWorkers.push(`${currentWorker.Name} ${currentWorker.surname}`);
      } else {
        console.log(`Робітник з ID ${id} недоступний`);
      }
    } else {
      console.log(`Робітник з ID ${id} не знайдений`);
    }
  });

  return availableWorkers;
}

/!*
const myWorkers = checkoutWorkers("Ann", 1, 2, 4);

myWorkers.forEach(employee => {
  console.log(employee);
});
*!/

function showMenu(): void {
  console.log("Оберіть завдання:");
  console.log("1. Вивести першого доступного робітника");
  console.log("2. Вивести імена робітників за категорією");
  console.log("3. Вивести всіх розробників(Developer)");
  console.log("4. Отримати інформацію про робітника за ID");
  console.log("5. Створити ID замовника");
  console.log("6. Вивести доступних робітників");
  console.log("7. Вивести робітників за ID");
  console.log("8. Створити замовника");
  console.log("9. Вивести імена робітників за категорією (за замовчуванням Designer)");
  console.log("10. Вивести першого доступного робітника");
  console.log("11. Оформити замовлення на робітників");
  console.log("0. Вийти");
}

function main(): void {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => readline.question(query, resolve));
  }

  async function menu() {
    let exit = false;
    while (!exit) {
      showMenu();
      const choice = await askQuestion("Ваш вибір: ");
      switch (choice) {
        case '1':
          const workers = getAllWorkers();
          logFirstAvailable(workers);
          break;
        case '2':
          const category = await askQuestion("Введіть категорію (BusinessAnalyst, Developer, Designer, QA, ScrumMaster): ");
          logWorkersNames(getWorkersNamesByCategory(Category[category as keyof typeof Category]));
          break;
        case '3':
          logDevelopers();
          break;
        case '4':
          const id = parseInt(await askQuestion("Введіть ID робітника: "), 10);
          console.log(getWorkerByID(id));
          break;
        case '5':
          const name = await askQuestion("Введіть ім'я замовника: ");
          const customerId = parseInt(await askQuestion("Введіть ID замовника: "), 10);

          // Використання звичайної функції
          console.log(createCustomerID(name, customerId));

          // Використання стрілочної функції
          let IdGenerator: (name: string, id: number) => string;
          IdGenerator = (name: string, id: number): string => {
            return `${name}${id}`;
          };
          console.log(IdGenerator(name, customerId));

          // Присвоєння функції змінній
          IdGenerator = createCustomerID;
          console.log(IdGenerator(name, customerId));
          break;

        case '6':
          console.log(getAvailableWorkers());
          break;
        case '7':
          const ids = (await askQuestion("Введіть ID робітників через кому: ")).split(',').map(Number);
          console.log(getWorkersByIDs(ids));
          break;
        case '8':
          const customerName = await askQuestion("Введіть ім'я замовника: ");
          const age = parseInt(await askQuestion("Введіть вік замовника (необов'язково): "), 10);
          const city = await askQuestion("Введіть місто замовника (необов'язково): ");
          createCustomer(customerName, isNaN(age) ? undefined : age, city || undefined);
          break;
        case '9':
          console.log(getWorkersNamesByCategoryWithDefault());
          break;
        case '10':
          logFirstAvailableDefault();
          break;
        case '11':
          const customer = await askQuestion("Введіть ім'я замовника: ");
          const workerIDs = (await askQuestion("Введіть ID робітників через кому: ")).split(',').map(Number);
          console.log(checkoutWorkers(customer, ...workerIDs));
          break;
        case '0':
          exit = true;
          break;
        default:
          console.log("Невірний вибір, спробуйте ще раз.");
      }
    }
    readline.close();
  }

  menu();
}

main();*/
