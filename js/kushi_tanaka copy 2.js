// jsチェック：alert
// alert("テスト")
// console.log("first")

// Deferred文脈の作成
var num1, num2; //グローバル変数で設定しないと$.when以降の変数として当たらない（if内のみの変数となってしまう）
var num1Ready = $.Deferred();
var num2Ready = $.Deferred();

// サイコロを動かす
$('.button').off('click');
$('.button').on("click", function () {
    console.log("起動")
    $(".dice1,.dice2").addClass('rotate');
    $(".play-button").get(0).play()

    //左側サイコロストップ 
    setTimeout(function () {
        $(".dice1").removeClass('rotate');
        // 左側サイコロの出目
        num1 = Math.floor(Math.random() * 6) + 1 //確率指定なし1〜6

        console.log(num1)
        num1Ready.resolve(); //準備完了
        console.log("完了")

        $('.dice1 .item').addClass('block');
        $(`.dice1 .item[data-face="${num1}"]`).removeClass('block');
        $(`.dice1 .item[data-face="${num1}"]`).css("transform", "none");
    }, 1500);

    // 右側サイコロストップ
    setTimeout(function () {
        $(".dice2").removeClass('rotate');

        // 片方のサイコロの出目による条件分け
        if (num1 % 2 === 0) { // 左サイコロの出目が偶数の場合
            if (Math.random() < 0.7) {
                num2 = Math.floor(Math.random() * 3) * 2 + 1; //60%の確率で奇数： 乱数設定0〜3*2+1
            } else {
                num2 = Math.floor(Math.random() * 3) * 2 + 2; //40%の確率で偶数： 乱数設定0〜3*2+2
            }
        } else if (num1 % 2 === 1) { // 左サイコロの出目が奇数の場合
            if (Math.random() < 0.7) {
                num2 = Math.floor(Math.random() * 3) * 2 + 2; //60%の確率偶数： 乱数設定0〜3*2+1
            } else {
                num2 = Math.floor(Math.random() * 3) * 2 + 1; //40%の確率で奇数： 乱数設定0〜3*2+2
            }
        } else {
            num2 = Math.floor(Math.random() * 6) + 1 //確率指定なし1〜6
        }

        console.log(num2)
        num2Ready.resolve(); //準備完了
        console.log("完了")

        $('.dice2 .item').addClass('block');
        $(`.dice2 .item[data-face="${num2}"]`).removeClass('block');
        $(`.dice2 .item[data-face="${num2}"]`).css("transform", "none");
    }, 2000);


    // 両方のサイコロの変数が揃った時の挙動
    $.when(num1Ready, num2Ready).done(function () {
        var sum = num1 + num2;
        console.log(sum)
        if ((num1 == 1) && (num2 == 1)) { //出目が1のゾロ目場合
            console.log("1ゾロ目")
            $(".kekka").css("background-color", "transparent")
            $(".kekka").html('<img src="./img/mega-muryo.png" class="half-width-image"></img> ');
        } else if ((num1 == num2) && !(num1 == 1)) { //出目が1以外のゾロ目場合
            console.log("ゾロ目")
            $(".kekka").css("background-color", "transparent")
            $(".kekka").html('<img src="./img/muryo.png" class="half-width-image"></img> ');
        } else if (sum % 2 === 0) { //出目の合計が偶数場合
            console.log("半額")
            $(".kekka").css("background-color", "transparent")
            $(".kekka").html('<img src="img/hangaku.png" class="half-width-image"></img> ');
        } else if (sum % 2 === 1) { //出目の合計が奇数場合
            console.log("倍量倍額")
            $(".kekka").css("background-color", "transparent")
            $(".kekka").html('<img src="./img/bai-bai.png" class="half-width-image"></img> ');
        }
    },)
});