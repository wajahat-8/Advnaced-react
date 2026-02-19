function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to react master class</h2>
      <h3>{numQuestions} question test to master react</h3>
      <button className="btn btn-ui">lets start</button>
    </div>
  );
}

export default StartScreen;
