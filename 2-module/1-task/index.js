function sumSalary(salaries) {
  let totalSalary = 0;
  
  for (let key in salaries) {
    if (typeof salaries[key] === 'number' && !isNaN(salaries[key]) && isFinite(salaries[key])) {
      totalSalary += salaries[key];
    }
  }
  
  return totalSalary;
}

