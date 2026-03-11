# 🎯 CRUD Operations Guide - Redux Practice

## 📚 What is CRUD?

**CRUD** stands for:
- **C**reate - Add new records
- **R**ead - Fetch and display records
- **U**pdate - Modify existing records  
- **D**elete - Remove records (not implemented yet - your exercise!)

This project now demonstrates **CRU** operations with Redux!

---

## ✅ Implemented Features

### 1. **CREATE** - Add New Booking
- Click "New Booking" button
- **Navigates to `/create` page**
- Fill out the form
- Dispatch: `createBooking(data)`
- **Navigates back to `/` (home)**

### 2. **READ** - Fetch Bookings
- On page load: `fetchBookings()`
- Redux fetches from API
- Stores in `items` array
- Displays in grid

### 3. **UPDATE** - Edit Existing Booking
- Click Edit icon on booking card
- **Navigates to `/edit/:id` page**
- Form pre-fills with existing data
- Modify form data
- Dispatch: `updateBooking({ id, updates })`
- **Navigates back to `/` (home)**

### 4. **DELETE** - Remove Booking
- ⚠️ **NOT IMPLEMENTED** - This is your exercise!
- Add delete button
- Add confirmation dialog
- Dispatch: `deleteBooking(id)`
- Redux removes from state

---

## 🔄 Create Booking Flow

```
┌─────────────────────────────────────────┐
│  USER: Clicks "New Booking" button      │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  ROUTER: Navigates to /create           │
│  <ManageBooking /> component mounts     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  USER: Fills form & clicks "Create"     │
│  - Client ID: 109                       │
│  - Start Date: 2026-02-22               │
│  - Status: SCHEDULED                    │
│  - Description: "New meeting"           │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  DISPATCH ACTION                         │
│  dispatch(createBooking({ ... }))       │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  ASYNC THUNK: createBooking.fulfilled   │
│  Reducer adds booking to state          │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  ROUTER: Navigates back to home (/)     │
│  User sees new booking in list          │
└─────────────────────────────────────────┘
```

---

## 🔄 Update Booking Flow

```
┌─────────────────────────────────────────┐
│  USER: Clicks Edit icon on booking     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  LOCAL STATE: Form opens with data      │
│  setIsFormOpen(true)                    │
│  setEditingBooking(booking)             │
│  Form pre-fills with booking values     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  USER: Changes status to "COMPLETED"    │
│  Clicks "Update Booking"                │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  DISPATCH ACTION                         │
│  dispatch(updateBooking({               │
│    id: 1,                               │
│    updates: { status: "COMPLETED" }     │
│  }))                                    │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  ASYNC THUNK: updateBooking.pending     │
│  Reducer: state.loading = true          │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  API CALL: BookingService.update()      │
│  Returns: Updated booking object        │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  ASYNC THUNK: updateBooking.fulfilled   │
│  Reducer:                               │
│    Find booking in items array          │
│    Replace with updated booking         │
│    Update selectedBooking if same       │
│  ✅ Booking updated in Redux state     │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  UI UPDATES                              │
│  Booking card shows "COMPLETED" badge   │
│  ✅ Change reflected immediately        │
└─────────────────────────────────────────┘
```

---

## 💻 Code Breakdown

### 1. Async Thunks (src/store/slices/booking.slice.ts)

```typescript
// CREATE BOOKING
export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (bookingData: Partial<Booking>, { rejectWithValue }) => {
    try {
      const res = await BookingService.create(bookingData);
      return res.data; // This becomes action.payload
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// UPDATE BOOKING
export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async (
    { id, updates }: { id: number; updates: Partial<Booking> },
    { rejectWithValue }
  ) => {
    try {
      const res = await BookingService.update(id, updates);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
```

### 2. Extra Reducers (State Updates)

```typescript
extraReducers: (builder) => {
  builder
    // CREATE
    .addCase(createBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(action.payload); // ← Add to array
    })
    .addCase(createBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // UPDATE
    .addCase(updateBooking.fulfilled, (state, action) => {
      state.loading = false;
      // Find and replace booking
      const index = state.items.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload; // ← Replace
      }
    });
}
```

### 3. Component Integration (src/pages/Bookings.tsx)

```typescript
// OPEN CREATE FORM
const handleOpenCreateForm = () => {
  setEditingBooking(null); // No booking = CREATE mode
  setIsFormOpen(true);
};

// OPEN EDIT FORM
const handleOpenEditForm = (booking: Booking) => {
  setEditingBooking(booking); // Pass booking = EDIT mode
  setIsFormOpen(true);
};

// SUBMIT FORM
const handleFormSubmit = async (data: Partial<Booking>) => {
  if (editingBooking) {
    // UPDATE
    await dispatch(updateBooking({ id: editingBooking.id, updates: data }));
  } else {
    // CREATE
    await dispatch(createBooking(data));
  }
  setIsFormOpen(false);
};
```

---

## 🎨 UI Components

### BookingForm.tsx
- Reusable modal form
- Works for CREATE and EDIT
- Validates required fields
- Shows loading state

### BookingCard.tsx
- Added Edit icon button
- Calls `onEdit(booking)` when clicked
- Passes booking data to parent

---

## 🧪 How to Test

### Test CREATE:
1. Click "New Booking" button
2. Fill in form:
   - Client ID: 109
   - Start Date: Tomorrow's date
   - Status: SCHEDULED
   - Description: "Test booking"
3. Click "Create Booking"
4. **Expected**: New booking appears in grid
5. **Redux**: Check items array has new booking

### Test UPDATE:
1. Click Edit icon on any booking card
2. Change status to "COMPLETED"
3. Click "Update Booking"
4. **Expected**: Status badge updates to green
5. **Redux**: Booking in items array is updated

### Test Validation:
1. Try to create booking without Client ID
2. **Expected**: Form prevents submission
3. Required fields show validation

---

## 🎯 Exercise: Add DELETE Functionality

Now it's your turn! Implement DELETE to complete CRUD.

### Step 1: Add Async Thunk
```typescript
// In booking.slice.ts
export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (id: number, { rejectWithValue }) => {
    try {
      await BookingService.delete(id);
      return id; // Return deleted ID
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
```

### Step 2: Add Reducer
```typescript
.addCase(deleteBooking.fulfilled, (state, action) => {
  state.loading = false;
  // Remove booking from array
  state.items = state.items.filter(
    (booking) => booking.id !== action.payload
  );
});
```

### Step 3: Add Delete Button
```typescript
// In BookingCard.tsx
<button onClick={() => onDelete(booking.id)}>
  <Trash2 size={16} />
</button>
```

### Step 4: Add Confirmation Dialog
```typescript
// In Bookings.tsx
const handleDelete = async (id: number) => {
  if (confirm("Delete this booking?")) {
    await dispatch(deleteBooking(id));
  }
};
```

---

## 🚀 Advanced Features to Add

1. **Optimistic Updates**
   - Update UI before API confirms
   - Roll back if API fails

2. **Undo/Redo**
   - Store action history
   - Replay/reverse actions

3. **Batch Operations**
   - Delete multiple bookings
   - Update multiple statuses

4. **Real-time Sync**
   - WebSocket updates
   - Refresh on visibility change

---

## 📊 State Management Patterns

### Pattern 1: Optimistic Update
```typescript
.addCase(updateBooking.pending, (state, action) => {
  // Update UI immediately (optimistic)
  const index = state.items.findIndex(b => b.id === action.meta.arg.id);
  if (index !== -1) {
    state.items[index] = { ...state.items[index], ...action.meta.arg.updates };
  }
})
.addCase(updateBooking.rejected, (state, action) => {
  // Roll back if failed
  dispatch(fetchBookings());
});
```

### Pattern 2: Local State + Redux
```typescript
// Form state = Local (temporary)
const [formData, setFormData] = useState({...});

// Bookings = Redux (shared)
const { items } = useAppSelector(state => state.booking);
```

---

## 🎓 Key Learnings

1. **Async Thunks handle side effects** (API calls)
2. **ExtraReducers handle async lifecycles** (pending/fulfilled/rejected)
3. **Local state for UI** (modals, forms)
4. **Redux for shared data** (bookings list)
5. **One action can update multiple parts of state**

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Form doesn't clear | Reset local state on close |
| Duplicate bookings | Check if ID already exists |
| Update doesn't show | Verify reducer updates state |
| Loading never stops | Handle rejected case |

---

**Congratulations!** 🎉  
You now know how to build a **full CRUD application with Redux**!

Next: Implement DELETE to complete the challenge! 💪
