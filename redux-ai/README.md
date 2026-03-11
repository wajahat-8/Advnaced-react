# 📚 Redux Practice - Complete Booking Management System

> **A comprehensive React + TypeScript + Redux Toolkit project for learning modern Redux state management**

This project demonstrates **real-world Redux patterns** including async thunks, filters, local vs global state, and proper TypeScript integration.

---

## 🎯 What You'll Learn

- ✅ **Redux Toolkit** setup and configuration
- ✅ **Async thunks** for API calls
- ✅ **State slices** with reducers
- ✅ **Local state vs Redux state** patterns
- ✅ **TypeScript** integration with Redux
- ✅ **Filtering & searching** with useMemo
- ✅ **Dummy data** for testing
- ✅ **Modern UI** with Tailwind CSS

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:5173`

---

## 📂 Project Structure

```
src/
├── components/
│   ├── booking/
│   │   ├── AppliedFilterChips.tsx    # Filter chip display
│   │   ├── BookingCard.tsx           # Booking card component
│   │   ├── BookingFilters.tsx        # ⭐ Filter panel (local + Redux state)
│   │   └── BookingStatus.tsx         # Status badge
│   └── ui/
│       └── InputField.tsx            # Reusable input component
├── data/
│   └── dummy-bookings.ts             # 📊 Dummy data (8 bookings)
├── enums/
│   └── index.ts                      # BookingStatus enum
├── lib/
│   └── utils.ts                      # Utility functions (cn)
├── pages/
│   └── Bookings.tsx                  # 🎯 MAIN PAGE - Study this!
├── services/
│   └── booking.service.ts            # 🔌 API service (simulated)
├── store/
│   ├── slices/
│   │   └── booking.slice.ts          # ⭐ Redux slice (THE CORE)
│   ├── hooks.ts                      # Typed Redux hooks
│   └── index.ts                      # Store configuration
├── types/
│   └── index.ts                      # TypeScript types
├── App.tsx                           # Root component
├── main.tsx                          # ⭐ Entry point (Redux Provider)
└── index.css                         # Tailwind + CSS variables
```

---

## 🔄 Redux Data Flow (Step-by-Step)

### **Step 1: User Interaction**
```typescript
// User types in search box
onChange → setDraftClientSearch("john")
// ✅ Updates LOCAL state only (not Redux)
```

### **Step 2: Apply Filter Button**
```typescript
// User clicks "Apply Filter"
applyPanelFilters() → dispatch(updateAdvancedFilters({ clientSearch: "john" }))
// ✅ Now it updates Redux store
```

### **Step 3: Redux Action Dispatched**
```typescript
// Redux slice reducer runs
updateAdvancedFilters: (state, action) => {
  state.advancedFilters = { ...state.advancedFilters, ...action.payload };
}
// ✅ Redux state updated
```

### **Step 4: Component Re-renders**
```typescript
// useAppSelector detects change
const { advancedFilters } = useAppSelector((state) => state.booking);
// ✅ Component re-renders with new filters
```

### **Step 5: Filtering Logic**
```typescript
// useMemo recalculates filtered results
const filteredBookings = useMemo(() => {
  return items.filter((booking) => {
    // Apply ALL filters
    return statusMatch && clientMatch && employeeMatch && dateMatch;
  });
}, [activeFilter, advancedFilters, items]);
// ✅ Only matching bookings displayed
```

---

## 🧩 Key Redux Concepts Explained

### **1. Redux Slice** (`store/slices/booking.slice.ts`)

A **slice** contains:
- **State** - What data to store
- **Reducers** - How to update state (synchronous)
- **Async Thunks** - How to fetch data (asynchronous)

```typescript
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
```

### **2. Async Thunks** (API Calls)

```typescript
export const fetchBookings = createAsyncThunk(
  "booking/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await BookingService.fetchAll();
      return res.data.bookings; // ← This becomes action.payload
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
```

### **3. Dispatching Actions**

```typescript
// Sync action
dispatch(setStatusFilter("SCHEDULED"));

// Async thunk
dispatch(fetchBookings());
```

### **4. Reading State**

```typescript
const { items, loading, error } = useAppSelector((state) => state.booking);
```

---

## 🎨 Local State vs Redux State

### **When to Use LOCAL State**
- Temporary UI state (modal open/closed)
- Draft values (text input before submit)
- Form validation errors

### **When to Use REDUX State**
- Data shared across components
- Data fetched from API
- Filters/search that affect the entire page

### **Example: Filter Panel**

```typescript
// ❌ WITHOUT local state (bad performance)
const handleClientSearch = (e) => {
  // Dispatches to Redux on EVERY keystroke
  dispatch(updateAdvancedFilters({ clientSearch: e.target.value }));
};

// ✅ WITH local state (better performance)
const [draftClientSearch, setDraftClientSearch] = useState("");

const handleClientSearch = (e) => {
  // Just updates local state (fast)
  setDraftClientSearch(e.target.value);
};

const applyFilters = () => {
  // Only dispatch to Redux when user clicks "Apply"
  dispatch(updateAdvancedFilters({ clientSearch: draftClientSearch }));
};
```

---

## 🔍 Filtering Logic Explained

The `filteredBookings` uses **4 filters**:

### **1. Status Filter**
```typescript
const statusMatch = selectedFilter === "All" || booking.status === selectedFilter;
```

### **2. Client Search**
```typescript
const clientMatch =
  clientName.includes(searchTerm) ||
  clientEmail.includes(searchTerm) ||
  `#${booking.clientId}`.includes(searchTerm);
```

### **3. Employee Search**
```typescript
const employeeMatch = booking.bookingStaff?.some(
  (staff) => staff.employee?.user?.fullName?.includes(searchTerm)
);
```

### **4. Date Range**
```typescript
const startDateMatch =
  !advancedFilters.startDate ||
  new Date(booking.startDate) >= new Date(advancedFilters.startDate);
```

**Only bookings matching ALL filters are displayed.**

---

## 📊 Dummy Data

The project includes **8 dummy bookings** with:
- 4 different statuses (SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED)
- 8 unique clients
- 4 employees
- Realistic dates and descriptions

Located in: `src/data/dummy-bookings.ts`

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React** | UI framework |
| **TypeScript** | Type safety |
| **Redux Toolkit** | State management |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icons |
| **date-fns** | Date formatting |
| **clsx + tailwind-merge** | Class merging |

---

## 📖 Learning Path

### **Beginner**
1. Start with `src/pages/Bookings.tsx` - See how components use Redux
2. Read `src/store/slices/booking.slice.ts` - Understand reducers
3. Check `src/services/booking.service.ts` - See simulated API calls

### **Intermediate**
4. Study `BookingFilters.tsx` - Learn local vs Redux state
5. Explore `useAppSelector` usage - See state subscriptions
6. Understand `useMemo` for filtering - Optimize performance

### **Advanced**
7. Add new filters (price, duration, etc.)
8. Implement pagination
9. Add sorting functionality
10. Create new slices (users, products, etc.)

---

## 🎯 Common Redux Tasks

### **Add a New Filter**
```typescript
// 1. Update type in booking.slice.ts
export type BookingFilterValues = {
  clientSearch: string;
  employeeSearch: string;
  startDate: string | null;
  endDate: string | null;
  newFilter: string; // ← Add this
};

// 2. Update initial state
const initialAdvancedFilters: BookingFilterValues = {
  clientSearch: "",
  employeeSearch: "",
  startDate: null,
  endDate: null,
  newFilter: "", // ← Add this
};

// 3. Add filter logic in Bookings.tsx
const newFilterMatch = booking.someField.includes(advancedFilters.newFilter);

return statusMatch && clientMatch && employeeMatch && newFilterMatch;
```

### **Add a New Async Thunk**
```typescript
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: Partial<Booking>, { rejectWithValue }) => {
    try {
      const res = await BookingService.create(bookingData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Handle in extraReducers
builder.addCase(createBooking.fulfilled, (state, action) => {
  state.items.push(action.payload);
});
```

---

## 🐛 Debugging Tips

### **Redux DevTools**
Install the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools) to:
- Inspect state changes
- Time-travel debugging
- Trace action dispatch

### **Console Logging**
```typescript
const filteredBookings = useMemo(() => {
  console.log("🔍 Filtering with:", { activeFilter, advancedFilters });
  const result = items.filter(/* ... */);
  console.log("✅ Filtered results:", result.length);
  return result;
}, [activeFilter, advancedFilters, items]);
```

---

## 🚧 Exercises

Try these to reinforce your learning:

1. **Easy**: Add a "Clear All Filters" button
2. **Medium**: Add sorting (by date, client name, status)
3. **Hard**: Add pagination (10 items per page)
4. **Expert**: Create a new slice for managing users

---

## 📚 Additional Resources

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [React-Redux Hooks](https://react-redux.js.org/api/hooks)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [TypeScript with Redux](https://redux.js.org/usage/usage-with-typescript)

---

## 🤝 Contributing

This is a learning project! Feel free to:
- Add more features
- Improve the UI
- Add tests
- Create new examples

---

## 📝 License

MIT - Use this project however you want for learning!

---

## 💡 Key Takeaways

1. **Redux is for shared state** - Don't put everything in Redux
2. **Async thunks handle API calls** - They manage loading/error states
3. **Reducers update state** - They must be pure functions
4. **useMemo optimizes filtering** - Only recalculates when dependencies change
5. **TypeScript makes Redux safer** - Catch errors at compile time

---

## 🎉 Happy Learning!

Remember: **Redux is just a pattern**. Understanding the flow is more important than memorizing syntax.

Start with the basics, practice, and gradually build more complex features!
