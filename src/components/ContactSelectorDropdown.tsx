
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Search, X, User, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import useDebounce from '@/hooks/useDebounce';

export interface Contact {
  id: string;
  name: string;
  email: string;
}

interface ContactSelectorDropdownProps {
  contacts: Contact[];
  onSelect: (contact: Contact | null) => void;
  placeholder?: string;
  defaultSelected?: Contact | null;
  className?: string;
}

const ContactSelectorDropdown: React.FC<ContactSelectorDropdownProps> = ({
  contacts,
  onSelect,
  placeholder = 'Search contacts...',
  defaultSelected = null,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(defaultSelected);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter((contact) => {
    const search = debouncedSearchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(search) ||
      contact.email.toLowerCase().includes(search)
    );
  });

  // Handle selecting a contact
  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
    setSearchTerm('');
    onSelect(contact);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Handle clearing selection
  const handleClearSelection = () => {
    setSelectedContact(null);
    setSearchTerm('');
    onSelect(null);
    inputRef.current?.focus();
  };

  // Highlight matching text in search results
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <span key={i} className="bg-crm-highlight/20 font-medium">{part}</span> 
            : part
        )}
      </>
    );
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prevIndex) => 
          prevIndex < filteredContacts.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prevIndex) => 
          prevIndex > 0 ? prevIndex - 1 : filteredContacts.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredContacts.length) {
          handleSelectContact(filteredContacts[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Scroll highlighted item into view
  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;
    
    const highlightedElement = listboxRef.current?.children[highlightedIndex] as HTMLElement;
    if (highlightedElement) {
      highlightedElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [highlightedIndex, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset highlighted index when dropdown opens/closes or filtered contacts change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [isOpen, debouncedSearchTerm]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full font-sans",
        className
      )}
    >
      <div className={cn(
        "flex items-center gap-2 w-full rounded-md border border-input bg-background px-3 py-2",
        "focus-within:ring-2 focus-within:ring-crm-blue/30 focus-within:border-crm-blue",
        isOpen && "ring-2 ring-crm-blue/30 border-crm-blue"
      )}>
        <Search className="h-4 w-4 shrink-0 opacity-50" />
        
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            className={cn(
              "w-full bg-transparent outline-none placeholder:text-muted-foreground",
              selectedContact && "text-transparent caret-transparent"
            )}
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="contact-listbox"
            aria-activedescendant={
              highlightedIndex >= 0 ? `contact-option-${highlightedIndex}` : undefined
            }
            role="combobox"
          />
          
          {selectedContact && (
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <span className="text-foreground truncate">
                {selectedContact.name} ({selectedContact.email})
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-1">
          {selectedContact && (
            <button
              type="button"
              onClick={handleClearSelection}
              className="rounded-full p-1 hover:bg-muted"
              aria-label="Clear selection"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-1 hover:bg-muted"
            aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
          >
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-popover shadow-md animate-fadeIn border border-border">
          <ul
            ref={listboxRef}
            id="contact-listbox"
            role="listbox"
            className="py-1"
            aria-label="Contacts"
          >
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <li
                  key={contact.id}
                  id={`contact-option-${index}`}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 cursor-pointer",
                    "hover:bg-crm-blue/10",
                    highlightedIndex === index && "bg-crm-blue/10"
                  )}
                  onClick={() => handleSelectContact(contact)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex flex-col truncate">
                    <span className="font-medium truncate">
                      {highlightMatch(contact.name, debouncedSearchTerm)}
                    </span>
                    <span className="text-sm text-muted-foreground truncate">
                      {highlightMatch(contact.email, debouncedSearchTerm)}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-3 py-4 text-center text-muted-foreground">
                No contacts found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactSelectorDropdown;
