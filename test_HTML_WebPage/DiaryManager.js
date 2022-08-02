  const date = new Date();

  var curYear; var curMonth; var selectDate;

  if(!curYear){
    curYear = date.getFullYear();
    curMonth = date.getMonth();
  }

  var diaryContents = {};//외부 DB에 연결

  function SetYM(year, month) {
      //년 월을 표시
      var year_month = document.querySelector('#year-month');
      year_month.textContent = year + '년 ' + (month + 1) + '월';
      //지난 달과 다음 달 중 함께 표시될 부분 구하기
      const prevLast = new Date(year, month, 0);
      const thisLast = new Date(year, month + 1, 0);

      const PLDate = prevLast.getDate();
      const PLDay = prevLast.getDay();

      const TLDate = thisLast.getDate();
      const TLDay = thisLast.getDay();
      //지난 달의 날짜와 이번 달의 날짜 다음 달의 날짜를 배열에 담기
      const prevDates = [];
      const thisDates = Array.from({ length: TLDate }, (v, i) => i + 1);
      const nextDates = [];
      for (let i = 0; i <= PLDay; i++) {
        prevDates.unshift(PLDate - i);
      }

      for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
      }

      const dates = prevDates.concat(thisDates, nextDates);

      var tbody = document.querySelector('.dates');
      //미리 그려진 달력이 있다면 삭제
      while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild);
      }
      //최적화 위해서는 length 밖으로 빼주기
      let row = document.createElement("tr");
      for (let i = 0; i < dates.length; i++) {
        let data = document.createElement("td");
        data.innerHTML = dates[i];
        if (i < prevDates.length) {
          data.classList += ' prevDate';
          data.addEventListener('click', SeePrevMonth);//지난 달 날짜를 누르면 SeePrevMonth 함수 실행
        }//지난 달의 날짜들 클래스로 표시
        else if (i >= dates.length - nextDates.length) {
          data.classList += ' nextDate';
          data.addEventListener('click', SeeNextMonth);//다음 달 날짜를 누르면 SeeNextMonth 함수 실행
        }//다음 달의 날짜들 클래스로 표시
        data.classList += ' date';
        data.addEventListener('click', DateClick);
        //일욜이라면 새로 줄 만들어서 삽입
        if (i % 7 == 0) { row = document.createElement("tr"); data.classList += ' Sunday'; }
        row.appendChild(data);
        //토욜이라면 지금까지 줄 테이블에 삽입
        if (i % 7 == 6) { data.classList += ' Saturday'; tbody.appendChild(row); }
        //각 날짜별로 함수 넣어주기
      }
    }

    function DateClick() {
      selectDate = curYear + '.' + (curMonth + 1) + '.' + event.target.innerHTML;
      ShowContent(selectDate);
    }

    function SeePrevMonth() {
      if (curMonth == 0) {
        curYear--;
        curMonth = 11;
      }
      else {
        curMonth--;
      }
      SetYM(curYear, curMonth);
    }

    function SeeNextMonth() {
      if (curMonth == 11) {
        curYear++;
        curMonth = 0;
      }
      else {
        curMonth++;
      }
      SetYM(curYear, curMonth);
    }

  function ShowContent(data) {
    if(diaryContents[data]){
      alert(diaryContents[data]);
    }
  }