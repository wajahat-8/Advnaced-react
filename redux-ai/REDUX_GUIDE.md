# 🎓 Redux Learning Guide - Visual Flow Charts

## 📊 Complete Redux Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                              │
│  User types "john" in client search input                       │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LOCAL STATE UPDATE                             │
│  onChange → setDraftClientSearch("john")                        │
│  ✅ Component state updated (NOT Redux yet)                     │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │  (User continues typing...)
                       │  (No Redux updates yet - performance!)
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  USER CLICKS "APPLY FILTER"                      │
│  onClick → applyPanelFilters()                                  │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DISPATCH ACTION                               │
│  dispatch(updateAdvancedFilters({                               │
│    clientSearch: "john"                                         │
│  }))                                                            │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   REDUX REDUCER RUNS                             │
│  updateAdvancedFilters: (state, action) => {                   │
│    state.advancedFilters = {                                   │
│      ...state.advancedFilters,                                 │
│      ...action.payload  // ← { clientSearch: "john" }          │
│    }                                                            │
│  }                                                              │
│  ✅ Redux state updated                                        │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  REDUX NOTIFIES SUBSCRIBERS                      │
│  All components using useAppSelector are notified               │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  COMPONENT RE-RENDERS                            │
│  const { advancedFilters } = useAppSelector(...)                │
│  ✅ Component gets new state                                   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   useMemo RECALCULATES                           │
│  const filteredBookings = useMemo(() => {                       │
│    return items.filter(booking => {                            │
│      return booking.client.name.includes("john")               │
│    })                                                           │
│  }, [advancedFilters, items])                                  │
│  ✅ Only matching bookings returned                            │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      UI UPDATES                                  │
│  BookingCard components render filtered bookings                │
│  ✅ User sees only bookings matching "john"                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Async Thunk Flow (API Calls)

```
┌─────────────────────────────────────────────────────────────────┐
│                   PAGE COMPONENT MOUNTS                          │
│  useEffect(() => {                                              │
│    dispatch(fetchBookings())                                   │
│  }, [])                                                         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│              ASYNC THUNK: fetchBookings.pending                  │
│  Redux automatically dispatches this action                     │
│                                                                 │
│  Reducer:                                                       │
│  .addCase(fetchBookings.pending, (state) => {                  │
│    state.loading = true  ← Show loading spinner                │
│    state.error = null    ← Clear previous errors              │
│  })                                                            │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API CALL EXECUTES                           │
│  const res = await BookingService.fetchAll()                   │
│  (Simulated delay: 800ms)                                      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                ┌──────┴──────┐
                │             │
         SUCCESS│             │FAILURE
                │             │
                ▼             ▼
┌──────────────────────┐  ┌──────────────────────┐
│  fetchBookings       │  │  fetchBookings       │
│  .fulfilled          │  │  .rejected           │
│                      │  │                      │
│  Reducer:            │  │  Reducer:            │
│  state.loading=false │  │  state.loading=false │
│  state.items=payload │  │  state.error=message │
└──────────────────────┘  └──────────────────────┘
         │                         │
         │                         │
         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐
│   SHOW BOOKINGS      │  │   SHOW ERROR         │
│   ✅ Display cards   │  │   ❌ Display message │
└──────────────────────┘  └──────────────────────┘
```

---

## 🏗️ Redux Store Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         REDUX STORE                              │
│                                                                  │
│  {                                                              │
│    booking: {                    ← From bookingSlice            │
│      items: [...],               ← All bookings                 │
│      selectedBooking: null,      ← Single booking details       │
│      activeFilter: "All",        ← Status filter                │
│      advancedFilters: {          ← Search/date filters          │
│        clientSearch: "john",                                    │
│        employeeSearch: "",                                      │
│        startDate: null,                                         │
│        endDate: null                                            │
│      },                                                         │
│      loading: false,             ← Loading state                │
│      error: null                 ← Error message                │
│    }                                                            │
│    // Other slices would go here                               │
│    // user: { ... }                                            │
│    // cart: { ... }                                            │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Component → Redux Connection

```
┌─────────────────────────────────────────────────────────────────┐
│                      BOOKINGS COMPONENT                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  // ✅ READ from Redux                                          │
│  const { items, loading, error } = useAppSelector(              │
│    (state) => state.booking                                     │
│  )                                                              │
│     ▲                                                           │
│     │                                                           │
│     └── Subscribes to Redux store changes                      │
│                                                                  │
│  // ✅ WRITE to Redux                                          │
│  const dispatch = useAppDispatch()                             │
│                                                                  │
│  dispatch(setStatusFilter("SCHEDULED"))  ← Sync action         │
│  dispatch(fetchBookings())               ← Async thunk         │
│     │                                                           │
│     └── Sends actions to Redux store                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 File Organization

```
src/
│
├── 📂 store/                        ← Redux configuration
│   ├── index.ts                     ← Store setup
│   ├── hooks.ts                     ← Typed hooks
│   └── 📂 slices/
│       └── booking.slice.ts         ← Booking state logic
│
├── 📂 services/                     ← API layer
│   └── booking.service.ts           ← API calls
│
├── 📂 data/                         ← Mock data
│   └── dummy-bookings.ts
│
├── 📂 types/                        ← TypeScript types
│   └── index.ts
│
├── 📂 pages/                        ← Page components
│   └── Bookings.tsx                ← Main page (uses Redux)
│
└── 📂 components/
    ├── 📂 booking/
    │   ├── BookingFilters.tsx      ← Filter panel
    │   ├── BookingCard.tsx         ← Booking display
    │   └── ...
    └── 📂 ui/
        └── InputField.tsx          ← Reusable UI

FLOW:
Page Component → useAppSelector → Redux Store
                                      ↑
Page Component → dispatch(action) ────┘
```

---

## 🔍 Local State vs Redux State Pattern

### ❌ Without Local State (BAD)
```
┌──────────────────────────────────────────────────┐
│  USER TYPES IN INPUT                             │
└───────────┬──────────────────────────────────────┘
            │
            │ Every keystroke
            ▼
     ┌──────────────┐
     │ dispatch()   │
     │ Redux        │  ← TOO MANY UPDATES!
     │ EVERY TIME!  │  ← Performance issue!
     └──────────────┘
```

### ✅ With Local State (GOOD)
```
┌──────────────────────────────────────────────────┐
│  USER TYPES IN INPUT                             │
└───────────┬──────────────────────────────────────┘
            │
            │ Every keystroke
            ▼
     ┌──────────────┐
     │ setState()   │
     │ Local        │  ← Fast! React only
     │ Component    │
     └──────────────┘
            │
            │ Only when user clicks "Apply"
            ▼
     ┌──────────────┐
     │ dispatch()   │
     │ Redux        │  ← Single update
     │ Once only    │  ← Optimal!
     └──────────────┘
```

---

## 🎨 Filtering Process

```
┌─────────────────────────────────────────────────────────────────┐
│                       ALL BOOKINGS (8 items)                     │
│  [Book1, Book2, Book3, Book4, Book5, Book6, Book7, Book8]      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │  FILTER 1: Status          │
            │  activeFilter = "SCHEDULED"│
            │  Keep: Book1, Book5, Book6 │
            └────────────┬───────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │  FILTER 2: Client Search   │
            │  clientSearch = "john"     │
            │  Keep: Book1, Book5        │
            └────────────┬───────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │  FILTER 3: Employee Search │
            │  employeeSearch = ""       │
            │  Keep: Book1, Book5        │
            └────────────┬───────────────┘
                         │
                         ▼
            ┌────────────────────────────┐
            │  FILTER 4: Date Range      │
            │  startDate = "2026-02-17"  │
            │  Keep: Book1               │
            └────────────┬───────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FILTERED RESULTS (1 item)                      │
│  [Book1]                                                        │
│  ✅ DISPLAYED TO USER                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧪 Action Lifecycle

```
SYNC ACTION:
============
dispatch(setStatusFilter("SCHEDULED"))
    │
    ├─→ Type: "booking/setStatusFilter"
    ├─→ Payload: "SCHEDULED"
    │
    ▼
Reducer runs immediately
    │
    ▼
State updated: { activeFilter: "SCHEDULED" }
    │
    ▼
Component re-renders


ASYNC THUNK:
============
dispatch(fetchBookings())
    │
    ├─→ Automatically dispatches: fetchBookings.pending
    │      │
    │      ▼
    │   State: { loading: true, error: null }
    │      │
    │      ▼
    │   Component shows loading spinner
    │
    ├─→ API call executes
    │      │
    │      ├─→ SUCCESS?
    │      │      │
    │      │      ▼
    │      │   Automatically dispatches: fetchBookings.fulfilled
    │      │      │
    │      │      ▼
    │      │   State: { loading: false, items: [...data] }
    │      │      │
    │      │      ▼
    │      │   Component shows bookings
    │      │
    │      └─→ FAILURE?
    │             │
    │             ▼
    │          Automatically dispatches: fetchBookings.rejected
    │             │
    │             ▼
    │          State: { loading: false, error: "Error message" }
    │             │
    │             ▼
    │          Component shows error
```

---

## 🎓 Common Patterns

### Pattern 1: Fetching Data on Mount
```typescript
useEffect(() => {
  dispatch(fetchBookings())
}, [dispatch])
```

### Pattern 2: Dispatching with User Input
```typescript
const handleFilterChange = (value: string) => {
  dispatch(setStatusFilter(value))
}
```

### Pattern 3: Optimized Filtering
```typescript
const filtered = useMemo(() => {
  return items.filter(/* filter logic */)
}, [items, filters])  // Only recalculate when these change
```

### Pattern 4: Draft State → Redux State
```typescript
// Local state (temporary)
const [draft, setDraft] = useState("")

// User types
onChange={(e) => setDraft(e.target.value)}

// User confirms
onClick={() => dispatch(updateFilter(draft))}
```

---

## 🔧 Debugging Checklist

1. ✅ Is Redux DevTools installed?
2. ✅ Is the Provider wrapping your app?
3. ✅ Are you using typed hooks (useAppSelector, useAppDispatch)?
4. ✅ Are your dependencies correct in useMemo/useEffect?
5. ✅ Is your reducer a pure function (no mutations)?
6. ✅ Are async thunks handling errors properly?

---

## 💡 Key Principles

1. **Single Source of Truth**: All shared state in Redux
2. **State is Read-Only**: Only update via actions
3. **Pure Functions**: Reducers don't mutate state
4. **Async in Thunks**: Keep reducers synchronous
5. **Local for UI**: Don't put everything in Redux

---

Happy Learning! 🎉
