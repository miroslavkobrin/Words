$(document).ready(function() {
    let words = [
        { en: "always", ua: "завжди" },
        { en: "never", ua: "ніколи" },
        { en: "apple", ua: "яблуко" },
        { en: "house", ua: "будинок" },
        { en: "water", ua: "вода" },
        { en: "friend", ua: "друг" },
        { en: "book", ua: "книга" },
        { en: "car", ua: "машина" },
        { en: "school", ua: "школа" },
        { en: "time", ua: "час" }
    ];

    words.sort(() => Math.random() - 0.5);

    let currentStep = 0;
    let correct = 0;
    let wrong = 0;

    function showWord() {
        if (currentStep < words.length) {
            $("#card").text(words[currentStep].en);
            $("#currentStep").text(currentStep + 1);
            $("#userInput").val("").focus();
        }
    }

    function checkAnswer() {
        if (currentStep >= words.length) return;

        let userAnswer = $("#userInput").val().trim().toLowerCase();
        
        if (userAnswer === "") {
            $("#card").text("Введіть слово!").css("color", "orange");
            setTimeout(() => {
                $("#card").text(words[currentStep].en).css("color", "#333");
            }, 1000);
            return;
        }

        let correctAnswer = words[currentStep].ua.toLowerCase();

        if (userAnswer === correctAnswer) {
            correct++;
            $("#correctCount").text(correct);
            $("#card").css("background", "#d4edda");
        } else {
            wrong++;
            $("#wrongCount").text(wrong);
            $("#card").css("background", "#f8d7da");
        }

        currentStep++;

        setTimeout(() => {
            $("#card").css("background", "#fff");
            if (currentStep < words.length) {
                showWord();
            } else {
                $("#card").text("Гру завершено!");
                $("#userInput").prop("disabled", true);
                showResult();
            }
        }, 800);
    }

    function showResult() {
        let message = "Ви переклали правильно " + correct + " з " + words.length + " слів.<br><br>";
        
        if (correct === words.length) {
            message += "Ідеально! Ви знаєте мову досконало! 🏆";
        } else if (correct >= 7) {
            message += "Чудовий результат! 👍";
        } else if (correct >= 4) {
            message += "Непогано, але варто повторити. 📚";
        } else {
            message += "Потрібно більше практики. 💪";
        }

        $("#finalMessage").html(message);
        $("#resultModal").css("display", "flex");
    }

    $("#card").click(function() {
        checkAnswer();
    });

    $("#userInput").keypress(function(event) {
        if (event.which === 13) {
            checkAnswer();
        }
    });

    $("#closeModal").click(function() {
        location.reload();
    });

    showWord();
});