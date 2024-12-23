const Ternary = () => {
  const a = true;
  const b = false;

  return (
    <div>
      <p>stwierdzenie a jest {a ? "prawdziwe" : "fałszywe"}</p>
      <p>stwierdzenie b jest {b ? "prawdziwe" : "fałszywe"}</p>
    </div>
  );
};

export default Ternary;
