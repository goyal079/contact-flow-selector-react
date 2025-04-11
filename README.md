
# CRM Contact Selector Dropdown

A reusable React component that allows users to search and select contacts from a list in a CRM application.

## Component Design

The `ContactSelectorDropdown` component is built with the following design principles:

- **Clean UI**: Professional appearance with subtle animations and visual feedback
- **Intuitive UX**: Clear input field, dropdown items with name and email, and responsive interactions
- **Accessibility**: ARIA roles and attributes for screen reader compatibility
- **Modularity**: Reusable component with clear props interface
- **Performance**: Optimized for handling large contact lists (100+ contacts) with debounced search

## Features

- 🔍 Search filtering by name or email (case-insensitive)
- ⌨️ Keyboard navigation (arrow keys, Enter, Escape)
- 🔆 Highlighted search matches in results
- 🧹 Clear selection button
- ⏱️ Debounced search input
- ♿ Accessibility support with ARIA attributes
- 🚀 Performance optimized for large contact lists

## State Handling

The component manages several pieces of state:

- `selectedContact`: The currently selected contact
- `searchTerm`: The current search input value
- `debouncedSearchTerm`: A debounced version of the search term to prevent excessive filtering
- `isOpen`: Controls the visibility of the dropdown
- `highlightedIndex`: Tracks the currently highlighted option for keyboard navigation

## Keyboard Support

The component implements comprehensive keyboard navigation:

- **Arrow Down**: Open dropdown if closed, move to next option if open
- **Arrow Up**: Move to previous option
- **Enter**: Select highlighted option, or open dropdown if closed
- **Escape**: Close dropdown

## Props Interface

```tsx
interface ContactSelectorDropdownProps {
  contacts: Contact[]; // Array of contact objects
  onSelect: (contact: Contact | null) => void; // Callback when a contact is selected
  placeholder?: string; // Optional input placeholder
  defaultSelected?: Contact | null; // Pre-selected contact (if any)
  className?: string; // Optional additional classes
}

interface Contact {
  id: string;
  name: string;
  email: string;
}
```

## Future Improvements

- Virtual scrolling for extremely large datasets (1000+ contacts)
- Multi-select functionality
- Grouping and categorization of contacts
- Contact creation from search input
- Customizable styling and theming options
- Saved/recent searches functionality
- Integration with server-side search for very large datasets
