window.CD = {
 "stages": [
  {
   "n": 1,
   "name": "語文",
   "sub": "國文（國一＋國二）",
   "emoji": "📖",
   "c1": "#7c3aed",
   "c2": "#a78bfa",
   "att": [
    {
     "t": "近體詩結構表",
     "h": "\n<p><b>七言律詩</b>：8 句，每句 7 字，全詩 56 字</p>\n<p><b>四聯</b>：第 1、2 句＝首聯　　第 3、4 句＝<b>頷聯</b><br>\n　　　　第 5、6 句＝<b>頸聯</b>　　第 7、8 句＝尾聯</p>\n<p>每一聯的<b>上句</b>是奇數句、<b>下句</b>是偶數句。<br>\n律詩中<b>必須對仗</b>的是<b>頷聯與頸聯</b>。</p>"
    },
    {
     "t": "筆畫索引表",
     "h": "\n<table class=\"bh\">\n<tr><td class=\"c\">三</td><td>3</td><td class=\"c\">天</td><td>4</td><td class=\"c\">光</td><td>6</td><td class=\"c\">來</td><td>8</td></tr>\n<tr><td class=\"c\">山</td><td>3</td><td class=\"c\">月</td><td>4</td><td class=\"c\">回</td><td>6</td><td class=\"c\">長</td><td>8</td></tr>\n<tr><td class=\"c\">六</td><td>4</td><td class=\"c\">火</td><td>4</td><td class=\"c\">老</td><td>6</td><td class=\"c\">雨</td><td>8</td></tr>\n<tr><td class=\"c\">日</td><td>4</td><td class=\"c\">去</td><td>5</td><td class=\"c\">別</td><td>7</td><td class=\"c\">春</td><td>9</td></tr>\n<tr><td class=\"c\">心</td><td>4</td><td class=\"c\">生</td><td>5</td><td class=\"c\">見</td><td>7</td><td class=\"c\">風</td><td>9</td></tr>\n<tr><td class=\"c\">抬</td><td>8</td><td class=\"c\">書</td><td>10</td><td class=\"c\">程</td><td>12</td><td class=\"c\">頭</td><td>16</td></tr>\n</table>\n<p class=\"small\">表上有 24 個字，其中<b>只有 3 個</b>會用到。其餘都是干擾。</p>"
    }
   ],
   "A": {
    "title": "找出異類",
    "lead": "四題都要找出「<b>和其他三個不一樣</b>」的那一個。",
    "rule": "把四個答案的<b>選項編號</b>依序寫出來，就是信封 B 的密碼。",
    "keep": "這四個答案等一下<b>信封 C 還要用</b>，一定要寫在紙上。",
    "body": "\n<div class=\"q\"><b>①</b> 下列「」中的字，讀音何者與其他三者「<b>不同</b>」？\n<div class=\"opt\">(1) 自「給」自足　(2)「給」予<br>(3) 供「給」　　　(4)「給」我一本書</div></div>\n<div class=\"q\"><b>②</b> 下列成語，何者「<b>不是</b>」用來形容時間快速流逝？\n<div class=\"opt\">(1) 白駒過隙　(2) 光陰似箭<br>(3) 汗牛充棟　(4) 稍縱即逝</div></div>\n<div class=\"q\"><b>③</b> 下列句子，何者「<b>沒有</b>」語病？\n<div class=\"opt\">(1) 這本書的內容十分精采，值得大家一讀。<br>(2) 為了避免不再發生類似事件，學校加強了宣導。<br>(3) 他是我們班上最高的同學之一。<br>(4) 透過這次活動，使我學到很多。</div></div>\n<div class=\"q\"><b>④</b> 下列文句，使用的修辭何者與其他三者「<b>不同</b>」？\n<div class=\"opt\">(1) 銀河瀉落，星子在窗邊低語<br>(2) 春天的腳步近了<br>(3) 這座山高得可以摘到星星<br>(4) 老屋在風裡嘆息</div></div>",
    "code": "4313",
    "why": "",
    "min": 4
   },
   "B": {
    "title": "律詩定位 ＋ 筆畫轉碼",
    "lead": "這一關要轉兩次碼。",
    "rule": "用<b>近體詩結構表</b>判斷哪一句是哪一聯，取出三個字。<br>再到<b>筆畫索引表</b>查出這三個字各是幾畫，<b>依序接起來</b>就是信封 C 的密碼。",
    "body": "\n<div class=\"poem\">\n<span>1</span>六月蟬鳴滿舊窗<br><span>2</span>三年燈火照書堂<br>\n<span>3</span>別來風雨催人老<br><span>4</span>歸去雲山帶月光<br>\n<span>5</span>回首豈知程已半<br><span>6</span>抬頭方見路猶長<br>\n<span>7</span>莫言此去無憑據<br><span>8</span>一寸光陰一寸強\n</div>\n<div class=\"q\"><b>①</b> 頷聯「<b>上句</b>」的第 <b>1</b> 字</div>\n<div class=\"q\"><b>②</b> 頸聯「<b>上句</b>」的第 <b>1</b> 字</div>\n<div class=\"q\"><b>③</b> 頸聯「<b>下句</b>」的第 <b>2</b> 字</div>",
    "code": "7616",
    "min": 6
   },
   "C": {
    "title": "文學常識 ＋ 回溯",
    "lead": "⚠️ 這一題<b>需要信封 A 的四個答案</b>。",
    "rule": "設信封 A 的四個答案依序是 <b>a、b、c、d</b>。請算出三個編號：<br>　編號① ＝ a ＋ b　　編號② ＝ c ＋ d　　編號③ ＝ a ＋ b ＋ c ＋ d<br>到索引表找出這三項，<b>答對它們的問題</b>，才能取得旁邊的字。",
    "body": "\n<table class=\"idx\">\n<tr><td class=\"n\">1</td><td>《論語》是誰的言行記錄？</td><td class=\"w\">停</td></tr>\n<tr><td class=\"n\">2</td><td>《史記》採用什麼體例？</td><td class=\"w\">走</td></tr>\n<tr><td class=\"n\">3</td><td>〈醉翁亭記〉的作者是誰？</td><td class=\"w\">看</td></tr>\n<tr><td class=\"n\">4</td><td>〈岳陽樓記〉中「先天下之憂而憂」的作者？</td><td class=\"w\">回</td></tr>\n<tr><td class=\"n\">5</td><td>〈桃花源記〉的作者是誰？</td><td class=\"w\">下</td></tr>\n<tr><td class=\"n\">6</td><td>《世說新語》的編者是誰？</td><td class=\"w\">前</td></tr>\n<tr><td class=\"n\">7</td><td>《儒林外史》是什麼性質的小說？</td><td class=\"w\">別</td></tr>\n<tr><td class=\"n\">8</td><td>《聊齋志異》的作者是誰？</td><td class=\"w\">上</td></tr>\n<tr><td class=\"n\">9</td><td>〈陋室銘〉的作者是誰？</td><td class=\"w\">左</td></tr>\n<tr><td class=\"n\">10</td><td>《詩經》是中國最早的什麼？</td><td class=\"w\">右</td></tr>\n<tr><td class=\"n\">11</td><td>〈師說〉的作者是誰？</td><td class=\"w\">頭</td></tr>\n<tr><td class=\"n\">12</td><td>《資治通鑑》的作者是誰？</td><td class=\"w\">後</td></tr>\n</table>",
    "code": "別回頭",
    "min": 5
   },
   "msg": "別回頭",
   "frag": {
    "c": "你",
    "n": "8"
   },
   "bonus": "索引表第 2 項：《史記》採用什麼體例？（答案：紀傳體，中國第一部紀傳體通史）"
  },
  {
   "n": 2,
   "name": "時空",
   "sub": "中國史＋臺灣史＋世界地理",
   "emoji": "🗺",
   "c1": "#0891b2",
   "c2": "#67e8f9",
   "att": [
    {
     "t": "中外大事年表",
     "h": "<table class=\"yr\"><tr><th>編號</th><th>年代</th><th>事件</th><th>編號</th><th>年代</th><th>事件</th></tr><tr><td class=\"n\">01</td><td class=\"y\">前 221</td><td>秦統一六國</td><td class=\"n\">09</td><td class=\"y\">1662</td><td>鄭成功驅逐荷蘭人</td></tr><tr><td class=\"n\">02</td><td class=\"y\">前 138</td><td>張騫首次出使西域</td><td class=\"n\">10</td><td class=\"y\">1683</td><td>施琅攻臺，鄭氏結束</td></tr><tr><td class=\"n\">03</td><td class=\"y\">105</td><td>蔡倫改良造紙術</td><td class=\"n\">11</td><td class=\"y\">1842</td><td>鴉片戰爭・南京條約</td></tr><tr><td class=\"n\">04</td><td class=\"y\">605</td><td>隋煬帝開鑿大運河</td><td class=\"n\">12</td><td class=\"y\">1874</td><td>牡丹社事件</td></tr><tr><td class=\"n\">05</td><td class=\"y\">626</td><td>唐太宗即位</td><td class=\"n\">13</td><td class=\"y\">1894</td><td>甲午戰爭</td></tr><tr><td class=\"n\">06</td><td class=\"y\">1069</td><td>王安石變法</td><td class=\"n\">14</td><td class=\"y\">1895</td><td>馬關條約・臺灣割日</td></tr><tr><td class=\"n\">07</td><td class=\"y\">1405</td><td>鄭和首次下西洋</td><td class=\"n\">15</td><td class=\"y\">1911</td><td>辛亥革命</td></tr><tr><td class=\"n\">08</td><td class=\"y\">1624</td><td>荷蘭人佔領大員</td><td class=\"n\">16</td><td class=\"y\">1945</td><td>二次大戰結束</td></tr></table>"
    },
    {
     "t": "世界時區表",
     "h": "\n<table class=\"yr\">\n<tr><th>城市</th><th>時區</th><th>城市</th><th>時區</th></tr>\n<tr><td>臺北</td><td>UTC ＋8</td><td>倫敦</td><td>UTC ＋0</td></tr>\n<tr><td>東京</td><td>UTC ＋9</td><td>紐約</td><td>UTC －5</td></tr>\n<tr><td>雪梨</td><td>UTC ＋10</td><td>洛杉磯</td><td>UTC －8</td></tr>\n</table>"
    }
   ],
   "A": {
    "title": "找出錯的三句",
    "lead": "下面六句話，其中<b>剛好有三句是錯的</b>。",
    "rule": "把那<b>三句的題號</b>由小到大寫出來，就是信封 B 的密碼。",
    "keep": "這三個題號等一下<b>信封 C 還要用</b>，一定要寫在紙上。",
    "body": "\n<div class=\"q\"><b>①</b> 秦始皇廢封建、行郡縣，並統一文字與度量衡。</div>\n<div class=\"q\"><b>②</b> 漢武帝在位期間，蔡倫改良了造紙術。</div>\n<div class=\"q\"><b>③</b> 科舉制度創立於隋朝，唐朝加以發揚。</div>\n<div class=\"q\"><b>④</b> 鄭成功驅逐荷蘭人之後，臺灣隨即進入清領時期。</div>\n<div class=\"q\"><b>⑤</b> 中國地勢西高東低，由西向東分為三級階梯。</div>\n<div class=\"q\"><b>⑥</b> 南京條約是清廷在甲午戰爭戰敗後簽訂的。</div>",
    "code": "246",
    "why": "",
    "min": 4
   },
   "B": {
    "title": "年代計算 ＋ 數字和",
    "lead": "這一關要轉兩次碼。",
    "rule": "用<b>中外大事年表</b>計算。⚠️ 西元前與西元後的年份<b>直接相加</b>即可。<br>算出年數後，<b>把該答案的各位數字加起來</b>，得到一個個位數。<br>四個個位數依序接起來，就是信封 C 的密碼。",
    "body": "\n<div class=\"q\"><b>①</b> 從「秦統一六國」到「辛亥革命」，相隔幾年？</div>\n<div class=\"q\"><b>②</b> 從「鄭成功驅逐荷蘭人」到「馬關條約」，相隔幾年？</div>\n<div class=\"q\"><b>③</b> 從「南京條約」到「甲午戰爭」，相隔幾年？</div>\n<div class=\"q\"><b>④</b> 從「馬關條約」到「二次大戰結束」，相隔幾年？</div>",
    "code": "8875",
    "min": 6
   },
   "C": {
    "title": "時區計算 ＋ 回溯",
    "lead": "⚠️ 這一題<b>需要信封 A 的答案</b>。",
    "rule": "設信封 A 的三個錯誤題號（由小到大）是 <b>a、b、c</b>。<br>「<b>臺北現在是 a 月 b 日 c 時</b>（24 小時制）。」<br>用<b>世界時區表</b>算出四個城市此刻的日期與時間，到對照表找出對應的字，<b>依題號順序</b>讀出來。",
    "body": "\n<div class=\"q\"><b>①</b> 紐約（UTC －5）　<b>②</b> 倫敦（UTC ＋0）<br><b>③</b> 東京（UTC ＋9）　<b>④</b> 雪梨（UTC ＋10）</div>\n<table class=\"idx\">\n<tr><td>紐約 2/3 17 時</td><td class=\"w\">還</td><td>紐約 2/4 17 時</td><td class=\"w\">急</td></tr>\n<tr><td>倫敦 2/3 22 時</td><td class=\"w\">有</td><td>倫敦 2/4 22 時</td><td class=\"w\">慢</td></tr>\n<tr><td>東京 2/4 07 時</td><td class=\"w\">時</td><td>東京 2/3 07 時</td><td class=\"w\">停</td></tr>\n<tr><td>雪梨 2/4 08 時</td><td class=\"w\">間</td><td>雪梨 2/3 08 時</td><td class=\"w\">等</td></tr>\n</table>",
    "code": "還有時間",
    "min": 5
   },
   "msg": "還有時間",
   "frag": {
    "c": "來",
    "n": "2"
   },
   "bonus": "為什麼會跨日？時差＝兩地 UTC 的差，東加西減；算出來小於 0 或大於等於 24 就要跨日。"
  },
  {
   "n": 3,
   "name": "數理",
   "sub": "數學＋理化",
   "emoji": "🧪",
   "c1": "#b45309",
   "c2": "#fbbf24",
   "att": [
    {
     "t": "密度表 ＆ 元素符號表",
     "h": "\n<table class=\"yr\">\n<tr><th>物質</th><th>密度 (g/cm³)</th><th>元素</th><th>符號</th></tr>\n<tr><td>水</td><td>1.0</td><td>氫</td><td>H</td></tr>\n<tr><td>鋁</td><td>2.7</td><td>碳</td><td>C</td></tr>\n<tr><td>鐵</td><td>7.9</td><td>鋁</td><td>Al</td></tr>\n<tr><td>銅</td><td><b>8.9</b></td><td>銅</td><td>Cu</td></tr>\n<tr><td>金</td><td>19.3</td><td>氯</td><td>Cl</td></tr>\n</table>"
    }
   ],
   "A": {
    "title": "四題快算",
    "lead": "四題，每題答案都是<b>個位數</b>。",
    "rule": "四個答案依序接起來，就是信封 B 的密碼。",
    "keep": "這四個答案等一下<b>信封 C 還要用</b>，一定要寫在紙上。",
    "body": "\n<div class=\"q\"><b>①</b> x² － 9x ＋ 20 ＝ 0，兩根之「<b>差</b>」是多少？（大減小）</div>\n<div class=\"q\"><b>②</b> (－3)² － 3² ＝ ？</div>\n<div class=\"q\"><b>③</b> √121 － √81 ＝ ？</div>\n<div class=\"q\"><b>④</b> 5⁰ ＋ 2² ＝ ？</div>",
    "code": "1025",
    "why": "",
    "min": 4
   },
   "B": {
    "title": "電路 ＋ 配平",
    "lead": "把①②的答案依序接起來。",
    "rule": "①的答案（一位數）接上②的四個係數，就是信封 C 的密碼。",
    "body": "\n<div class=\"q\"><b>①</b> 兩個 <b>6 Ω</b> 的電阻「<b>並聯</b>」之後，再與一個 <b>5 Ω</b> 的電阻「<b>串聯</b>」。<br>整個電路的總電阻是幾歐姆？</div>\n<div class=\"q\"><b>②</b> 請配平下列化學反應式，把<b>四個係數</b>依序寫出：\n<div class=\"formula\">＿ Al　＋　＿ HCl　→　＿ AlCl₃　＋　＿ H₂</div></div>\n<div class=\"q bonus\"><b>【加分題】③</b> 一塊金屬質量 <b>356 公克</b>、體積 <b>40 立方公分</b>。查密度表，它是什麼金屬？</div>",
    "code": "82623",
    "min": 6
   },
   "C": {
    "title": "歐姆定律 ＋ 回溯",
    "lead": "⚠️ 這一題<b>需要信封 A 的四個答案</b>。",
    "rule": "設信封 A 的四個答案依序是 <b>a、b、c、d</b>。有四個電阻：<br>　甲 ＝（a＋1）Ω　乙 ＝（b＋4）Ω　丙 ＝（c＋3）Ω　丁 ＝（d＋1）Ω<br>把<b>甲、乙、丙</b>分別接上 <b>60 V</b> 電源（各自獨立），算出電流，依「<b>電流由小到大</b>」讀出對應的字。（<b>丁不使用</b>）",
    "body": "\n<table class=\"idx\">\n<tr><td class=\"n\">2 Ω</td><td class=\"w\">想</td><td class=\"n\">3 Ω</td><td class=\"w\">走</td></tr>\n<tr><td class=\"n\">4 Ω</td><td class=\"w\">靜</td><td class=\"n\">5 Ω</td><td class=\"w\">冷</td></tr>\n<tr><td class=\"n\">6 Ω</td><td class=\"w\">停</td><td class=\"n\">8 Ω</td><td class=\"w\">回</td></tr>\n</table>",
    "code": "冷靜想",
    "min": 5
   },
   "msg": "冷靜想",
   "frag": {
    "c": "得",
    "n": "5"
   },
   "bonus": "為什麼電阻大反而電流小？因為 V 固定時 I ＝ V/R，I 與 R 成反比。"
  },
  {
   "n": 4,
   "name": "人文",
   "sub": "公民（國二）＋經濟",
   "emoji": "⚖️",
   "c1": "#be123c",
   "c2": "#fb7185",
   "att": [
    {
     "t": "五院職權表",
     "h": "\n<table class=\"yr\">\n<tr><th>編號</th><th>院</th><th>主要職權</th><th>字</th></tr>\n<tr><td class=\"n\">1</td><td>行政院</td><td>國家最高行政機關</td><td class=\"w\">就</td></tr>\n<tr><td class=\"n\">2</td><td>立法院</td><td>制定法律、審查預算</td><td class=\"w\">走</td></tr>\n<tr><td class=\"n\">3</td><td>司法院</td><td>審判、大法官釋憲</td><td class=\"w\">現</td></tr>\n<tr><td class=\"n\">4</td><td>考試院</td><td>公務人員考試、銓敘</td><td class=\"w\">停</td></tr>\n<tr><td class=\"n\">5</td><td>監察院</td><td>彈劾、糾舉、<b>審計</b></td><td class=\"w\">在</td></tr>\n</table>"
    },
    {
     "t": "法定年齡表",
     "h": "\n<table class=\"yr\">\n<tr><th>年齡</th><th>意義</th><th>依據</th></tr>\n<tr><td><b>14 歲</b></td><td>未滿此歲數，行為不罰</td><td>刑法 §18</td></tr>\n<tr><td><b>18 歲</b></td><td>民法成年、完全行為能力、公民投票權</td><td>民法 §12</td></tr>\n<tr><td><b>20 歲</b></td><td>選舉權</td><td>憲法 §130</td></tr>\n<tr><td><b>23 歲</b></td><td>被選舉權</td><td>憲法 §130</td></tr>\n</table>"
    }
   ],
   "A": {
    "title": "找出錯的三句",
    "lead": "下面六句話，其中<b>剛好有三句是錯的</b>。",
    "rule": "把那<b>三句的題號</b>由小到大寫出來，就是信封 B 的密碼。",
    "keep": "這三個題號等一下<b>信封 C 還要用</b>，一定要寫在紙上。",
    "body": "\n<div class=\"q\"><b>①</b> 依民法規定，年滿 20 歲為成年人。</div>\n<div class=\"q\"><b>②</b> 我國中央政府依憲法規定，設有五院。</div>\n<div class=\"q\"><b>③</b> 立法院院長由總統任命。</div>\n<div class=\"q\"><b>④</b> 依刑法規定，未滿 14 歲人之行為不罰。</div>\n<div class=\"q\"><b>⑤</b> 機會成本是指所有被放棄的選項，其價值的總和。</div>\n<div class=\"q\"><b>⑥</b> 需求法則：其他條件不變下，價格上升則需求量減少。</div>",
    "code": "135",
    "why": "",
    "min": 4
   },
   "B": {
    "title": "經濟 ＋ 政府組織",
    "lead": "三題的答案依序接起來。",
    "rule": "①的百分比數字，接上②的編號，再接上③的項數，就是信封 C 的密碼。",
    "body": "\n<div class=\"q\"><b>①</b> 某商品原價 100 元時，市場需求量為 50 個。政府課稅後價格上升到 120 元，需求量降為 40 個。<br>請問「<b>需求量</b>」減少了百分之幾？</div>\n<div class=\"q\"><b>②</b> 五院之中，哪一院掌管「<b>審計</b>」？請寫出它在五院職權表上的<b>編號</b>。</div>\n<div class=\"q\"><b>③</b> 一位年滿 <b>23 歲</b>的中華民國國民，查法定年齡表，他總共已經符合表上的<b>幾項</b>資格？</div>",
    "code": "2054",
    "min": 6
   },
   "C": {
    "title": "五院 ＋ 回溯",
    "lead": "⚠️ 這一題<b>需要信封 A 的答案</b>。",
    "rule": "設信封 A 的三個錯誤題號（由小到大）是 <b>a、b、c</b>。<br>到<b>五院職權表</b>上找出第 <b>a</b>、第 <b>b</b>、第 <b>c</b> 院，<b>依序</b>讀出它們旁邊的字。",
    "body": "<div class=\"q\">往上捲到附件「<b>五院職權表</b>」查表。</div>",
    "code": "就現在",
    "min": 5
   },
   "msg": "就現在",
   "frag": {
    "c": "及",
    "n": "1"
   },
   "bonus": "小明有 500 元，可買電影票、書或衣服（都 500 元），最想要的順序是 電影＞書＞衣服，他選了電影。機會成本是「<b>那本書</b>」——放棄的選項中價值最高的那一個，不是全部加總。"
  }
 ],
 "final": {
  "phrase": "你來得及",
  "code": "8251"
 },
 "ans": {
  "1": {
   "A": "① 4「給我」讀 ㄍㄟˇ（其餘讀 ㄐㄧˇ）　② 3 汗牛充棟形容書多　③ 1（其餘三句都有語病）　④ 3 誇飾（其餘轉化）",
   "B": "頷聯上句＝第3句「別」7畫 → 頸聯上句＝第5句「回」6畫 → 頸聯下句＝第6句「頭」16畫",
   "C": "a=4 b=3 c=1 d=3 → 編號 7、4、11 → 第7《儒林外史》諷刺小說「別」、第4〈岳陽樓記〉范仲淹「回」、第11〈師說〉韓愈「頭」"
  },
  "2": {
   "A": "錯的是 ②④⑥。② 蔡倫是東漢和帝（非漢武帝）　④ 鄭成功後是鄭氏時期（清領要到1683）　⑥ 南京條約是鴉片戰爭後",
   "B": "221+1911=2132→8；1895−1662=233→8；1894−1842=52→7；1945−1895=50→5",
   "C": "a=2 b=4 c=6 → 臺北 2/4 06時。紐約−13→2/3 17時【還】倫敦−8→2/3 22時【有】東京+1→2/4 07時【時】雪梨+2→2/4 08時【間】"
  },
  "3": {
   "A": "① 根4,5 差=1　② 9−9=0　③ 11−9=2　④ 1+4=5（⚠️ 5⁰＝1）",
   "B": "兩個6Ω並聯=3Ω，串聯5Ω → 8Ω；2Al+6HCl→2AlCl₃+3H₂。加分題：356÷40=8.9→銅",
   "C": "a=1 b=0 c=2 d=5 → 甲2Ω→30A【想】乙4Ω→15A【靜】丙5Ω→12A【冷】。由小到大＝冷靜想（丁6Ω干擾）"
  },
  "4": {
   "A": "錯的是 ①③⑤。① 民法成年已改18歲　③ 立法院長由立委互選　⑤ 機會成本是價值最高的那一個",
   "B": "(50−40)÷50=20%；監察院編號5；23歲符合14/18/20/23共4項。⚠️ 陷阱：問的是「需求量」不是「價格」",
   "C": "a=1 b=3 c=5 → 1行政院【就】3司法院【現】5監察院【在】（2立法院【走】、4考試院【停】是干擾）"
  }
 },
 "traps": [
  {
   "s": "第1關",
   "q": "「他是班上最高的同學之一」",
   "a": "邏輯矛盾，是語病。「最高」只有一個"
  },
  {
   "s": "第2關",
   "q": "蔡倫是漢武帝時期的人",
   "a": "蔡倫是東漢和帝，漢武帝是西漢，差約 200 年"
  },
  {
   "s": "第2關",
   "q": "南京條約是甲午戰爭後簽的",
   "a": "南京條約＝鴉片戰爭(1842)；甲午→馬關條約(1895)"
  },
  {
   "s": "第3關",
   "q": "5⁰ ＝ 0",
   "a": "任何非零數的 0 次方都等於 1"
  },
  {
   "s": "第3關",
   "q": "電阻越大電流越大",
   "a": "V 固定時 I 與 R 成反比——電阻越大電流越小"
  },
  {
   "s": "第4關",
   "q": "機會成本是放棄選項的總和",
   "a": "是價值最高的那一個"
  }
 ]
};
