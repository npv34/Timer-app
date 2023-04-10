class TimeCounter {
  constructor() {
    this.second = 0;
    this.minute = 0;
    this.pauseState = true;
    this.reverseState = false;
  }
  pauseTime() {
    this.pauseState = true;
  }
  startTimer() {
    this.pauseState = false;
  }

  timeRoll() {
    let updateSec = setInterval(() => {
      if (!this.pauseState && !this.reverseState && this.second <= 9) {
        document.getElementById("second").innerHTML = "0" + this.second;
        this.second++;
      } else if (!this.pauseState && !this.reverseState && this.second <= 59) {
        document.getElementById("second").innerHTML = this.second;
        this.second++;
      } else if (this.second === 60 && !this.pauseState && !this.reverseState) {
        this.second = 0;
        document.getElementById("second").innerHTML = "00";
        this.minute++;
      }
    }, 1000);

    let updateMin = setInterval(() => {
      if (!this.pauseState && !this.reverseState && this.minute < 10) {
        document.getElementById("minute").innerHTML = "0" + this.minute;
      } else if (!this.pauseState && !this.reverseState) {
        document.getElementById("minute").innerHTML = this.minute;
      }
    }, 5);
  }
  showSetupScreen() {
    document.getElementById("setupPage").classList.add("show");
  }

  cancelScreen() {
    document.getElementById("setupPage").classList.remove("show");
  }

  setTimer() {
    this.second = document.getElementById("getSec").value;
    this.minute = document.getElementById("getMin").value;
    if (this.minute === 0 || this.minute === null) {
      document.getElementById("minute").innerHTML = "00";
    }
    console.log(this.minute);
    if (this.minute < 0 || this.second < 0 || this.second > 60) {
      alert("Error!");
    } else {
      console.log(this.minute, this.second);
      document.getElementById("minute").innerHTML = this.minute;
      document.getElementById("second").innerHTML = this.second;
      this.cancelScreen();
      this.pauseState = false;
      this.reverseState = true;

      let updateSec = setInterval(() => {
        if (
          !this.pauseState &&
          this.reverseState &&
          this.second <= 9 &&
          this.second > 0
        ) {
          document.getElementById("second").innerHTML = "0" + this.second;
          this.second--;
          console.log(this.second);
        } else if (
          !this.pauseState &&
          this.reverseState &&
          this.second <= 59 &&
          this.second > 0
        ) {
          document.getElementById("second").innerHTML = this.second;
          this.second--;
          console.log(this.minute, this.second);
        } else if (this.second <= 0) {
          this.second = 59;
          document.getElementById("second").innerHTML = "00";
          this.minute--;
        }
      }, 1000);

      let updateMin = setInterval(() => {
        if (
          !this.pauseState &&
          this.reverseState &&
          this.minute < 10 &&
          this.minute >= 0
        ) {
          document.getElementById("minute").innerHTML = "0" + this.minute;
        } else if (!this.pauseState && this.reverseState && this.minute > 0) {
          document.getElementById("minute").innerHTML = this.minute;
        } else if (this.minute < 0 && !this.pauseState && this.reverseState) {
          this.reverseState = false;
          this.pauseState = true;
          document.getElementById("endingPage").classList.add("show");
          let alertTone = new Audio("tone.mp3");
          alertTone.play();
        }
      }, 5);
    }
  }
}

