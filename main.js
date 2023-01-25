import { EquationSolver } from "./EquationSolver.js";
import { Result } from "./Result.js";

window.onload = function () {
  new EquationSolverFactory();
};

class EquationSolverFactory {
  constructor() {
    this.input = document.getElementById(EquationSolverFactory.inputId);
    this.output = document.getElementById(EquationSolverFactory.outputId);
    this.submitBtn = document.getElementById(EquationSolverFactory.submitBtnId);

    this.input.placeholder = "3 ^ (4 - 2) + 1";

    var $this = this;
    this.submitBtn.addEventListener("click", function (e) {
      $this.submitBtnDidClick(e);
    });
  }

  submitBtnDidClick(e) {
    var eqn = this.input.value.replace(/\s/g, "");
    var $this = this;
    var eqs = new EquationSolver(eqn);
    console.log("eqs", eqs);
    var result = this.createOutput(eqn, eqs.result, eqs.error);
    this.output.insertBefore(result.html, this.output.firstChild);
    result.html.addEventListener("click", function (e) {
      $this.resultDidClick(result);
    });
    if (this.output.children.length > 10) {
      this.output.removeChild(this.output.lastChild);
    }
  }

  resultDidClick(result) {
    this.input.value = result.input;
  }

  createOutput(eqn, soln, isError) {
    return new Result(eqn, soln, isError);
  }
}

EquationSolverFactory.inputId = "equation_input";
EquationSolverFactory.outputId = "equation_output";
EquationSolverFactory.submitBtnId = "equation_submit";
