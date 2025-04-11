
import React, { useState } from 'react';
import ContactSelectorDropdown, { Contact } from '@/components/ContactSelectorDropdown';
import { mockContacts } from '@/utils/mockContacts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAllContacts, setShowAllContacts] = useState(false);

  // Use a smaller subset by default for demonstration
  const displayContacts = showAllContacts ? mockContacts : mockContacts.slice(0, 20);

  const handleContactSelect = (contact: Contact | null) => {
    setSelectedContact(contact);
    
    if (contact) {
      toast({
        title: "Contact Selected",
        description: `You selected ${contact.name}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-crm-blue to-crm-purple bg-clip-text text-transparent">
            CRM Contact Selector
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            A responsive dropdown component to search and select contacts from your CRM system.
          </p>
        </header>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Selector Demo</CardTitle>
              <CardDescription>
                Search and select a contact from the list. Try typing a name or email, or use keyboard navigation (arrow keys, Enter, Esc).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-sm font-medium mb-2">Select a Contact:</h2>
                  <ContactSelectorDropdown
                    contacts={displayContacts}
                    onSelect={handleContactSelect}
                    placeholder="Search for a contact..."
                  />
                </div>
                
                <div className="bg-gray-50 rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2 text-gray-500">Selected Contact:</h3>
                  {selectedContact ? (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-crm-blue to-crm-purple flex items-center justify-center text-white font-medium">
                        {selectedContact.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{selectedContact.name}</p>
                        <p className="text-sm text-gray-500">{selectedContact.email}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No contact selected</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowAllContacts(!showAllContacts)}
              >
                {showAllContacts ? "Show Fewer Contacts (20)" : "Show All Contacts (150)"}
              </Button>
              
              <div className="text-sm text-gray-500">
                Showing {displayContacts.length} contacts
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Key features of the Contact Selector component</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-crm-blue"></span>
                  <span>Search by name or email (case-insensitive)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-crm-blue"></span>
                  <span>Keyboard navigation (arrow keys, Enter, Escape)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-crm-blue"></span>
                  <span>Text highlighting for search matches</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-crm-blue"></span>
                  <span>Clear selection button</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-crm-blue"></span>
                  <span>Debounced search for better performance</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-crm-blue"></span>
                  <span>Full ARIA support for accessibility</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>CRM Contact Selector Component - Built with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
