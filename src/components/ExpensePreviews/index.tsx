function ExpenseModule() {
  return (
    <div className="bg-white rounded-xl px-8 py-6 flex flex-col justify-between gap-y-4">
      <h2 className="text-primaryDarkGrey text-sm">Current Balance</h2>
      <p className="text-3xl text-primaryDark font-bold">
        <span className="text-2xl">$</span>4,836.00
      </p>
    </div>
  );
}

function ExpensePreviews() {
  return (
    <div className="grid grid-cols-3 gap-x-8 mt-10">
      <ExpenseModule />
      <ExpenseModule />
      <ExpenseModule />
    </div>
  );
}

export default ExpensePreviews;
