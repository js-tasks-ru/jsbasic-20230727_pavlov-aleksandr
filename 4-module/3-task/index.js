function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const cells = row.cells;

    const statusCell = cells[3];
    if (statusCell) {
      const status = statusCell.getAttribute('data-available');
      if (status === 'true') {
        row.classList.add('available');
      } else if (status === 'false') {
        row.classList.add('unavailable');
      } else {
        row.hidden = true;
      }
    }

    const genderCell = cells[2];
    if (genderCell) {
      const gender = genderCell.textContent;
      if (gender === 'm') {
        row.classList.add('male');
      } else if (gender === 'f') {
        row.classList.add('female');
      }
    }

    const ageCell = cells[1];
    if (ageCell) {
      const age = parseInt(ageCell.textContent);
      if (age < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
  });
}