 document.addEventListener("DOMContentLoaded", function () {
      var calendarEl = document.getElementById("test");

      test = new FullCalendar.Calendar(calendarEl, {
        plugins: ["interaction", "dayGrid"],
        defaultDate: "2021-06-06",
        editable: true,
        eventLimit: true,
        //   dateClick: function () {
        //     alert("제발");
        //     },
        dateClick: function (data) {
          $(".service").css("display", "block");
          $(".service_date").val(data.dateStr);
          console.log(data.dateStr);
        },
      });
      test.render();
    });
    
    $(function () {
    //mini date
      $("#datepicker").datepicker({
        dateFormat: "yy-mm-dd", //Input Display Format 변경
        showOtherMonths: true, //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
        changeYear: true, //콤보박스에서 년 선택 가능
        changeMonth: true, //콤보박스에서 월 선택 가능
        showOn: "both", //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
        buttonImage:
          "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif", //버튼 이미지 경로
        buttonImageOnly: true, //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        buttonText: "선택", //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
        yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
        monthNamesShort: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ], //달력의 월 부분 텍스트
        monthNames: [
          "1월",
          "2월",
          "3월",
          "4월",
          "5월",
          "6월",
          "7월",
          "8월",
          "9월",
          "10월",
          "11월",
          "12월",
        ], //달력의 월 부분 Tooltip 텍스트
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"], //달력의 요일 부분 텍스트
        dayNames: [
          "일요일",
          "월요일",
          "화요일",
          "수요일",
          "목요일",
          "금요일",
          "토요일",
        ], //달력의 요일 부분 Tooltip 텍스트
        minDate: "-1M", //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        maxDate: "+1M", //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
      });
      console.clear();

      const nav = document.querySelector("nav");
      const navLinksContainer = document.querySelector(".nav-links");
      const navLinks = [...document.querySelectorAll(".link")];
      const menuBtn = document.querySelector(".menu-btn");
      const subMenuBtn = document.querySelector(".sub-menu-btn");

      function createHoverEl() {
        let hoverEl = document.createElement("div");
        hoverEl.className = "hover-el";
        hoverEl.style.setProperty("--y", "0px");
        hoverEl.style.setProperty("--mousex", "0px");
        hoverEl.style.setProperty("--mousey", "0px");
        navLinksContainer.appendChild(hoverEl);
      }
      createHoverEl();

      navLinks.forEach((link, index) => {
        let hoverEl = navLinksContainer.querySelector(".hover-el");
        link.style.setProperty("--delay", `${index * 50}ms`);
        link.addEventListener("mousemove", function (e) {
          hoverEl.style.setProperty("--y", `${index * 60}px`);
          hoverEl.style.setProperty("opacity", "1");
          hoverEl.style.setProperty(
            "--mousex",
            `${e.pageX - hoverEl.offsetLeft}px`
          );
          hoverEl.style.setProperty(
            "--mousey",
            `${e.pageY - hoverEl.offsetTop}px`
          );
        });
        navLinksContainer.addEventListener("mouseout", function () {
          hoverEl.style.setProperty("opacity", "0");
        });
        link.addEventListener("click", function () {
          let hoverEl = navLinksContainer.querySelector(".hover-el");
          hoverEl.style.opacity = "0";
          toggleSubmenu(link);
        });
      });

      menuBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
        menuBtn.classList.toggle("close");
      });
      subMenuBtn.addEventListener("click", function () {
        nav.classList.toggle("sub-menu-open");
        removeSubmenu();
      });

      function toggleSubmenu(el) {
        let subMenu = nav.querySelector(".sub-menu");
        if (el.children[1]) {
          createSubmenu(el);
        } else if (nav.contains(subMenu)) {
          removeSubmenu();
        } else {
          return;
        }
      }

      function createSubmenu(el) {
        let subMenuContainer = document.createElement("div");
        subMenuContainer.className = "sub-menu";
        let subMenuItem = el.children[1].cloneNode(true);
        let subMenuItemList = [...subMenuItem.children];
        subMenuItemList.forEach((item, index) => {
          item.classList.add("off-menu");
          item.style.setProperty("--delay", `${index * 40}ms`);
        });
        nav.classList.toggle("sub-menu-open");
        nav.appendChild(subMenuContainer);
        subMenuContainer.appendChild(subMenuItem);
        setTimeout(function () {
          subMenuItemList.forEach((item) => {
            item.classList.remove("off-menu");
            item.classList.add("on-menu");
          });
        }, 200);
      }
      function removeSubmenu() {
        let subMenu = nav.querySelector(".sub-menu");
        let subMenuItemList = [...subMenu.children[0].children];
        if (nav.contains(subMenu)) {
          subMenuItemList.forEach((item) => {
            item.classList.add("off-menu");
            item.classList.remove("on-menu");
          });
          setTimeout(function () {
            nav.removeChild(subMenu);
          }, 500);
        }
      }

      $("#datepicker").datepicker();

      $(".insert_btn").click(function () {
        $(".service").css("display", "none");
      });

    });