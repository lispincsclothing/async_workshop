function *main() {
  yield 1;
  yield 2;
  yield 3;
  return 4; //otherwise returns undefined, done will still be true
}

var it = main();
it.next();
