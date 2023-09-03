function factorial(n) {
  // ваш код...
  if (n!=0){
    var result=1;
    while(n){
      result *=n--;
    }
  }
  else{
    return 1;
  }
  return(result)
}