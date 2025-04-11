
import { Contact } from '@/components/ContactSelectorDropdown';

const firstNames = [
  'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Hannah',
  'Ian', 'Julia', 'Kevin', 'Laura', 'Michael', 'Nina', 'Oliver', 'Patricia',
  'Quincy', 'Rachel', 'Samuel', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xavier',
  'Yasmine', 'Zachary', 'Abigail', 'Benjamin', 'Catherine', 'Daniel', 'Eleanor',
  'Frederick', 'Georgia', 'Henry', 'Isabella', 'Jacob', 'Katherine', 'Lucas',
  'Megan', 'Nathan', 'Olivia', 'Patrick', 'Quinn', 'Rebecca', 'Stephen',
  'Taylor', 'Ursula', 'Vincent', 'Willow', 'Xander', 'Yvonne', 'Zane'
];

const lastNames = [
  'Anderson', 'Brown', 'Clark', 'Davis', 'Evans', 'Foster', 'Garcia', 'Harris',
  'Ibrahim', 'Jones', 'King', 'Lopez', 'Mitchell', 'Nguyen', 'O\'Brien', 'Parker',
  'Quinn', 'Robinson', 'Smith', 'Taylor', 'Usman', 'Vega', 'Williams', 'Xu',
  'Young', 'Zhang', 'Adams', 'Baker', 'Campbell', 'Diaz', 'Edwards', 'Fisher',
  'Gomez', 'Hill', 'Ingram', 'Johnson', 'Kelly', 'Lee', 'Morgan', 'Nelson',
  'Ortiz', 'Patel', 'Ramirez', 'Scott', 'Thomas', 'Unger', 'Vargas', 'Wilson',
  'Xiong', 'Yates', 'Zimmerman'
];

const domains = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
  'company.com', 'example.org', 'business.net', 'acme.co', 'startup.io'
];

function generateEmail(firstName: string, lastName: string): string {
  const random = Math.floor(Math.random() * 4);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  
  switch (random) {
    case 0:
      return `${firstName.toLowerCase()}${lastName.toLowerCase()}@${domain}`;
    case 1:
      return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
    case 2:
      return `${firstName.toLowerCase()[0]}${lastName.toLowerCase()}@${domain}`;
    default:
      return `${lastName.toLowerCase()}${firstName.toLowerCase()[0]}@${domain}`;
  }
}

export function generateMockContacts(count: number): Contact[] {
  const contacts: Contact[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const email = generateEmail(firstName, lastName);
    
    contacts.push({
      id: `contact-${i + 1}`,
      name: fullName,
      email: email
    });
  }
  
  // Sort contacts by name
  return contacts.sort((a, b) => a.name.localeCompare(b.name));
}

// Create a preset list of 150 contacts
export const mockContacts = generateMockContacts(150);
