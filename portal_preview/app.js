// app.js - Sports Hall Booking System Interactive Mock Interface

// 1. Initial State Data
const facilities = [
  { id: 'badminton', name: 'Badminton Court', icon: 'fa-solid fa-table-tennis-paddle-ball', location: 'Hall A', capacity: '4 Players' },
  { id: 'basketball', name: 'Basketball Court', icon: 'fa-solid fa-basketball', location: 'Main Hall', capacity: '10 Players' },
  { id: 'squash', name: 'Squash Court', icon: 'fa-solid fa-baseball-bat-ball', location: 'Hall B', capacity: '2 Players' },
  { id: 'tennis', name: 'Tennis Court', icon: 'fa-solid fa-baseball', location: 'Outdoor Arena', capacity: '4 Players' }
];

const timeSlots = [
  { id: 'slot_1', name: '08:00 - 09:00' },
  { id: 'slot_2', name: '09:00 - 10:00' },
  { id: 'slot_3', name: '10:00 - 11:00' },
  { id: 'slot_4', name: '11:00 - 12:00' },
  { id: 'slot_5', name: '12:00 - 13:00' },
  { id: 'slot_6', name: '13:00 - 14:00' },
  { id: 'slot_7', name: '14:00 - 15:00' },
  { id: 'slot_8', name: '15:00 - 16:00' },
  { id: 'slot_9', name: '16:00 - 17:00' },
  { id: 'slot_10', name: '17:00 - 18:00' },
  { id: 'slot_11', name: '18:00 - 19:00' },
  { id: 'slot_12', name: '19:00 - 20:00' },
  { id: 'slot_13', name: '20:00 - 21:00' },
  { id: 'slot_14', name: '21:00 - 22:00' }
];

// Active DB Bookings State (enriched with student info)
let bookings = [
  { id: 'BK-1002', facilityId: 'badminton', date: '2026-07-15', slotId: 'slot_3', slotName: '10:00 - 11:00', remarks: 'Tournament practice with Hemasree', status: 'approved', studentName: 'Jaswanth Malapareddy', studentId: 'SU2112820' },
  { id: 'BK-1001', facilityId: 'badminton', date: '2026-07-15', slotId: 'slot_11', slotName: '18:00 - 19:00', remarks: 'Fun session with Shaik', status: 'completed', studentName: 'Jaswanth Malapareddy', studentId: 'SU2112820' },
  { id: 'BK-1003', facilityId: 'basketball', date: '2026-07-15', slotId: 'slot_9', slotName: '16:00 - 17:00', remarks: 'Friendly match', status: 'pending', studentName: 'Jaswanth Malapareddy', studentId: 'SU2112820' },
  // External user bookings
  { id: 'BK-EXT-01', facilityId: 'badminton', date: '2026-07-15', slotId: 'slot_5', slotName: '12:00 - 13:00', remarks: 'Staff event', status: 'approved', isExternal: true, studentName: 'Prof. Ramesh', studentId: 'COORD-02' },
  { id: 'BK-EXT-02', facilityId: 'basketball', date: '2026-07-15', slotId: 'slot_1', slotName: '08:00 - 09:00', remarks: 'Club session', status: 'approved', isExternal: true, studentName: 'Sports Club Admin', studentId: 'COORD-01' }
];

let selectedFacilityId = 'badminton';
let selectedSlotId = null;

// Auth State
let currentUser = null;
let currentRole = 'student';

// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const appContainer = document.getElementById('appContainer');
const loginForm = document.getElementById('loginForm');
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const roleStudentBtn = document.getElementById('roleStudentBtn');
const roleCoordinatorBtn = document.getElementById('roleCoordinatorBtn');
const quickStudentBtn = document.getElementById('quickStudentBtn');
const quickCoordBtn = document.getElementById('quickCoordBtn');
const logoutBtn = document.getElementById('logoutBtn');
const usernameLabel = document.getElementById('usernameLabel');

const userAvatarEl = document.getElementById('userAvatar');
const userNameEl = document.getElementById('userName');
const userRoleEl = document.getElementById('userRole');

const facilityGrid = document.getElementById('facilityGrid');
const bookingDate = document.getElementById('bookingDate');
const slotsGrid = document.getElementById('slotsGrid');
const bookingFormCard = document.getElementById('bookingFormCard');
const bookingForm = document.getElementById('bookingForm');
const summaryFacility = document.getElementById('summaryFacility');
const summaryTime = document.getElementById('summaryTime');
const summaryDate = document.getElementById('summaryDate');
const remarksInput = document.getElementById('remarks');
const bookingsTableBody = document.getElementById('bookingsTableBody');
const emptyState = document.getElementById('emptyState');
const pendingCountEl = document.getElementById('pendingCount');
const approvedCountEl = document.getElementById('approvedCount');
const toastEl = document.getElementById('toast');
const toastMessageEl = document.getElementById('toastMessage');

// 2. Initialize App
function init() {
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  bookingDate.value = today;
  bookingDate.min = today;

  // Set initial login selector
  setRole('student');

  // Event Listeners for Login Screen
  roleStudentBtn.addEventListener('click', () => setRole('student'));
  roleCoordinatorBtn.addEventListener('click', () => setRole('coordinator'));
  quickStudentBtn.addEventListener('click', () => quickFill('student'));
  quickCoordBtn.addEventListener('click', () => quickFill('coordinator'));
  loginForm.addEventListener('submit', handleLoginSubmit);
  logoutBtn.addEventListener('click', handleLogout);

  // App Listeners
  bookingDate.addEventListener('change', () => {
    selectedSlotId = null;
    bookingFormCard.classList.add('hidden');
    renderSlots();
  });

  bookingForm.addEventListener('submit', handleBookingSubmit);
}

// 3. Auth Actions
function setRole(role) {
  currentRole = role;
  if (role === 'student') {
    roleStudentBtn.classList.add('active');
    roleCoordinatorBtn.classList.remove('active');
    usernameLabel.innerText = "Student ID / Roll Number";
    loginUsername.placeholder = "e.g. SU2112820";
  } else {
    roleStudentBtn.classList.remove('active');
    roleCoordinatorBtn.classList.add('active');
    usernameLabel.innerText = "Coordinator Username";
    loginUsername.placeholder = "e.g. admin_staff";
  }
}

function quickFill(role) {
  setRole(role);
  if (role === 'student') {
    loginUsername.value = "SU2112820";
    loginPassword.value = "student123";
  } else {
    loginUsername.value = "admin_staff";
    loginPassword.value = "admin123";
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const username = loginUsername.value.trim();
  const password = loginPassword.value;

  if (!username || !password) return;

  // Show loading spinner
  const originalBtnText = loginSubmitBtn.innerHTML;
  loginSubmitBtn.disabled = true;
  loginSubmitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Signing in...`;

  setTimeout(() => {
    loginSubmitBtn.disabled = false;
    loginSubmitBtn.innerHTML = originalBtnText;

    if (currentRole === 'student') {
      currentUser = {
        name: username === 'SU2112820' ? 'Jaswanth Malapareddy' : username,
        id: username,
        role: 'student'
      };
      
      // Update booking form input value
      const studentIdInput = document.getElementById('studentId');
      if (studentIdInput) {
        studentIdInput.value = currentUser.id;
      }
      document.body.classList.remove('coordinator-theme');
    } else {
      currentUser = {
        name: 'Staff Coordinator',
        id: username,
        role: 'coordinator'
      };
      document.body.classList.add('coordinator-theme');
    }

    // Update Header
    userNameEl.innerText = currentUser.name;
    userRoleEl.innerText = currentUser.role === 'student' ? 'Student (Member)' : 'Staff (Coordinator)';
    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
    userAvatarEl.innerText = initials;

    // Transition Screens
    loginContainer.classList.add('hidden');
    appContainer.classList.remove('hidden');

    showToast(`Welcome back, ${currentUser.name}!`, 'fa-solid fa-circle-check');

    // Render Portal
    renderFacilities();
    renderSlots();
    renderDashboard();
  }, 1000);
}

function handleLogout() {
  currentUser = null;
  loginUsername.value = '';
  loginPassword.value = '';
  selectedSlotId = null;

  bookingFormCard.classList.add('hidden');
  appContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');

  document.body.classList.remove('coordinator-theme');
  showToast('Logged out successfully.', 'fa-solid fa-right-from-bracket');
}

// 4. Render Facilities Cards
function renderFacilities() {
  facilityGrid.innerHTML = '';
  facilities.forEach(fac => {
    const card = document.createElement('div');
    card.className = `facility-card ${fac.id === selectedFacilityId ? 'selected' : ''}`;
    card.onclick = () => selectFacility(fac.id);
    
    card.innerHTML = `
      <div class="facility-icon-wrapper">
        <i class="${fac.icon}"></i>
      </div>
      <h3>${fac.name}</h3>
      <div class="facility-meta">
        <span><i class="fa-solid fa-location-dot"></i> ${fac.location}</span>
        <span><i class="fa-solid fa-user-group"></i> ${fac.capacity}</span>
      </div>
    `;
    facilityGrid.appendChild(card);
  });
}

function selectFacility(id) {
  selectedFacilityId = id;
  selectedSlotId = null;
  bookingFormCard.classList.add('hidden');
  renderFacilities();
  renderSlots();
}

// 5. Render Availability Grid
function renderSlots() {
  slotsGrid.innerHTML = '';
  const dateStr = bookingDate.value;

  timeSlots.forEach(slot => {
    const activeBooking = bookings.find(b => b.facilityId === selectedFacilityId && b.date === dateStr && b.slotId === slot.id && b.status !== 'rejected');
    
    let statusClass = 'available-status';
    let statusText = 'Available';
    
    if (activeBooking) {
      if (activeBooking.status === 'approved') {
        statusClass = 'booked-status';
        statusText = 'Reserved';
      } else if (activeBooking.status === 'pending') {
        statusClass = 'pending-status';
        statusText = 'Pending';
      } else if (activeBooking.status === 'completed') {
        statusClass = 'available-status';
        statusText = 'Available';
      }
    }

    const slotCard = document.createElement('div');
    slotCard.className = `slot-item ${statusClass} ${selectedSlotId === slot.id ? 'selected' : ''}`;
    slotCard.innerHTML = `
      <span class="slot-time">${slot.name}</span>
      <span class="slot-status-lbl">${statusText}</span>
    `;

    // Only allow booking if slot is available and user is a Student
    if (statusClass === 'available-status') {
      slotCard.onclick = () => {
        if (currentUser && currentUser.role === 'coordinator') {
          showToast('Coordinators cannot place bookings. Log in as a Student to book.', 'fa-solid fa-triangle-exclamation');
        } else {
          selectSlot(slot.id, slot.name);
        }
      };
    } else {
      slotCard.onclick = () => {
        if (activeBooking) {
          showToast(`Slot is ${statusText} (${activeBooking.id})`, 'fa-solid fa-info');
        }
      };
    }
    slotsGrid.appendChild(slotCard);
  });
}

function selectSlot(id, name) {
  selectedSlotId = id;
  
  const cards = slotsGrid.querySelectorAll('.slot-item');
  cards.forEach(c => c.classList.remove('selected'));
  
  const selectedIndex = timeSlots.findIndex(s => s.id === id);
  if (selectedIndex !== -1) {
    slotsGrid.children[selectedIndex].classList.add('selected');
  }

  const facility = facilities.find(f => f.id === selectedFacilityId);
  summaryFacility.innerText = facility.name;
  summaryTime.innerText = name;
  summaryDate.innerText = bookingDate.value;
  remarksInput.value = '';

  bookingFormCard.classList.remove('hidden');
  bookingFormCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 6. Handle Booking Submission
function handleBookingSubmit(e) {
  e.preventDefault();

  if (!selectedFacilityId || !selectedSlotId || !currentUser) return;

  const refNum = 'BK-' + Math.floor(1000 + Math.random() * 9000);
  const facility = facilities.find(f => f.id === selectedFacilityId);
  const slot = timeSlots.find(s => s.id === selectedSlotId);

  const newBooking = {
    id: refNum,
    facilityId: selectedFacilityId,
    date: bookingDate.value,
    slotId: selectedSlotId,
    slotName: slot.name,
    remarks: remarksInput.value,
    status: 'pending',
    studentName: currentUser.name,
    studentId: currentUser.id
  };

  bookings.unshift(newBooking);
  showToast(`Booking request ${refNum} submitted. Flow Designer approval started!`);

  selectedSlotId = null;
  bookingFormCard.classList.add('hidden');
  
  renderSlots();
  renderDashboard();

  simulateFlowDesignerApproval(refNum);
}

// 7. Simulate Flow Designer & Conflicts Auto-Rejection
function simulateFlowDesignerApproval(bookingId) {
  setTimeout(() => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking || booking.status !== 'pending') return;

    booking.status = 'approved';
    showToast(`Flow Designer approved ${bookingId}! Notification email sent.`, 'fa-solid fa-circle-check');

    // Auto-Reject Conflicting Bookings
    bookings.forEach(b => {
      if (b.id !== bookingId && b.facilityId === booking.facilityId && b.date === booking.date && b.slotId === booking.slotId && b.status === 'pending') {
        b.status = 'rejected';
      }
    });

    renderSlots();
    renderDashboard();
  }, 4500);
}

// 8. Render Dashboard (Filtered for Student / All for Coordinator)
function renderDashboard() {
  bookingsTableBody.innerHTML = '';
  
  if (!currentUser) return;

  const isCoord = currentUser.role === 'coordinator';
  const displayedBookings = isCoord ? bookings : bookings.filter(b => b.studentId === currentUser.id);

  if (displayedBookings.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    displayedBookings.forEach(b => {
      const facility = facilities.find(f => f.id === b.facilityId);
      const tr = document.createElement('tr');

      let actionHtml = '';
      if (isCoord) {
        if (b.status === 'pending') {
          actionHtml = `
            <div class="dashboard-actions">
              <button class="btn-action-approve" onclick="approveBooking('${b.id}')"><i class="fa-solid fa-check"></i> Approve</button>
              <button class="btn-action-reject" onclick="rejectBooking('${b.id}')"><i class="fa-solid fa-xmark"></i> Reject</button>
            </div>`;
        } else if (b.status === 'approved') {
          actionHtml = `<button class="btn-cancel" onclick="rejectBooking('${b.id}')"><i class="fa-solid fa-ban"></i> Revoke</button>`;
        }
      } else {
        if (b.status === 'pending' || b.status === 'approved') {
          actionHtml = `<button class="btn-cancel" onclick="cancelBooking('${b.id}')"><i class="fa-solid fa-xmark"></i> Cancel</button>`;
        }
      }

      // Add student info label if coordinator is viewing
      let userLabel = '';
      if (isCoord) {
        userLabel = `<br><span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;"><i class="fa-solid fa-user"></i> ${b.studentName || 'Student'} (${b.studentId || 'N/A'})</span>`;
      }

      tr.innerHTML = `
        <td><strong>${b.id}</strong>${userLabel}</td>
        <td>${facility ? facility.name : b.facilityId}</td>
        <td>${b.date}</td>
        <td>${b.slotName}</td>
        <td>${b.remarks}</td>
        <td><span class="status-pill ${b.status}">${b.status}</span></td>
        <td>${actionHtml}</td>
      `;
      bookingsTableBody.appendChild(tr);
    });
  }

  // Update Stats counts (depending on role)
  const pendingCount = displayedBookings.filter(b => b.status === 'pending').length;
  const approvedCount = displayedBookings.filter(b => b.status === 'approved').length;

  pendingCountEl.innerText = pendingCount;
  approvedCountEl.innerText = approvedCount;
}

// 9. Coordinator Management Actions
window.approveBooking = function(bookingId) {
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = 'approved';
    showToast(`Approved booking ${bookingId}. Notification email sent!`, 'fa-solid fa-circle-check');
    
    // Auto-Reject Conflicting Bookings
    bookings.forEach(b => {
      if (b.id !== bookingId && b.facilityId === booking.facilityId && b.date === booking.date && b.slotId === booking.slotId && b.status === 'pending') {
        b.status = 'rejected';
      }
    });
    
    renderSlots();
    renderDashboard();
  }
};

window.rejectBooking = function(bookingId) {
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = 'rejected';
    showToast(`Rejected/Revoked booking ${bookingId}. Notification email sent!`, 'fa-solid fa-circle-xmark');
    renderSlots();
    renderDashboard();
  }
};

// 10. Cancel Reservation (Student cancel self)
window.cancelBooking = function(bookingId) {
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index !== -1) {
    const b = bookings[index];
    bookings.splice(index, 1);
    showToast(`Booking ${bookingId} cancelled. Slot is now released!`, 'fa-solid fa-trash-can');
    renderSlots();
    renderDashboard();
  }
};

// 11. Show Toast notification
function showToast(message, iconClass = 'fa-solid fa-clock-rotate-left') {
  toastMessageEl.innerText = message;
  const icon = toastEl.querySelector('.toast-icon');
  icon.className = `toast-icon ${iconClass}`;
  
  toastEl.classList.add('show');
  
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 4000);
}

// Run init on window load
window.onload = init;
