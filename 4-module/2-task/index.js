function makeDiagonalRed(table) {
  const rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.cells[i]) {
      row.cells[i].style.backgroundColor = 'red';
    }
  }
}