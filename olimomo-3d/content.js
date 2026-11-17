/* ===== Olimomo's Farm 3D 版：內容（照 Claire 版 olimomo.claire92088.workers.dev 2026-11-17 版本） =====
   改內容只改這個檔；每句英文的 key 對應 audio/<key>.mp3（make_audio.py 產生，微軟語音） */
export const MASCOT = "Olimomo";

export const LINES = {
  fly_go:   {en:"Wheee! Let's fly to my farm!", zh:"我們坐熱氣球去我的牧場吧！"},
  fly_here: {en:"My farm is in Lunbei, Yunlin. Tap the light!", zh:"我的牧場在雲林縣崙背鄉，點一下發光的地方！"},
  land:     {en:"Hooray! We're here! Welcome to Olimomo's Farm. Follow me!", zh:"耶！我們到了！歡迎來到 Olimomo 的牧場，跟我來！"},
  hello:    {en:"Hello, my name is Olimomo. Welcome to my farm. And let's learn some fun facts about the cow.", zh:"大家好，我叫 Olimomo，歡迎來到我的牧場！我們一起來學一些關於牛的有趣小知識吧。"},
  guess:    {en:"Hello, everyone! Look at me. What's my name?", zh:"猜猜看！Olimomo 問 What's my name? 等小朋友一起喊出 Olimomo，再按 ✅ Yes 揭曉。"},
  guess_a:  {en:"Yes, you're right! My name is Olimomo. Welcome to my farm!", zh:"答對了！我叫 Olimomo，歡迎來到我的牧場！"},
  where:    {en:"Where are you now?", zh:"你現在在哪裡？請小朋友回答，再按 Answer 一起念。"},
  where_a:  {en:"I'm at Olimomo's Farm in Lunbei, Yunlin.", zh:""},
  name:     {en:"What's your name?", zh:"你叫什麼名字？請小朋友用 My name is ___. 或 I'm ___. 回答。"},
  name_a:   {en:"My name is Olimomo. What's your name?", zh:""},
  age:      {en:"How old are you?", zh:"你幾歲？點數字，再一起念 I'm ___ years old.（說 I'm 8. 也對）"},
  age_a:    {en:"I'm one year old. How old are you?", zh:""},
  rules:    {en:"Here are our farm rules. Eyes only, hands in pockets. Walk, don't run. Stay with your group. Wash your hands.", zh:"農場規則：1. 只用眼睛看，手放口袋　2. 用走的不要跑　3. 跟好你的小組　4. 記得洗手。準備好就按 Let's go outside！"},
  r0: {en:"Eyes only, hands in pockets.", zh:"只用眼睛看，手放口袋"},
  r1: {en:"Walk, don't run.", zh:"用走的，不要跑"},
  r2: {en:"Stay with your group.", zh:"跟好你的小組"},
  r3: {en:"Wash your hands.", zh:"記得洗手"},
  st_grass: {en:"Cows eat these grasses. Listen and say them with me!", zh:""},
  tw_intro: {en:"Let's learn some taste words! Tap a card and say it with me.", zh:"先學味道的字：點卡片聽 Olimomo 念，跟著說。"},
  milktea:  {en:"Mix milk and black tea. You get fresh milk tea!", zh:"牛奶加紅茶，變成鮮奶茶！"},
  expert:   {en:"You are cow experts!", zh:"你們都是牛博士了！"},
  try_again:{en:"Try again!", zh:"再想一想，換一個答案"}
};

export const RULES = [
  {key:"r0", en:"Eyes only,\nhands in pockets", zh:"只用眼睛看，手放口袋", ic:"👀"},
  {key:"r1", en:"Walk,\ndon't run", zh:"用走的，不要跑", ic:"🚶"},
  {key:"r2", en:"Stay with\nyour group", zh:"跟好你的小組", ic:"👫"},
  {key:"r3", en:"Wash\nyour hands", zh:"記得洗手", ic:"🧼"}
];

export const WARM = [
  {q:"where", title:"Where are you now?", ans:"I'm at Olimomo's Farm in Lunbei, Yunlin."},
  {q:"name",  title:"What's your name?", ans:"My name is ___. / I'm ___.", pair:"My name is ______. / I'm ______."},
  {q:"age",   title:"How old are you?", ans:"I'm ___ years old.", chips:[8,9,10,11], pair:"I'm ______ years old. / I'm ______."}
];

/* 牧場地圖上的地點 */
export const PLACES = [
  {id:"cows",      en:"Cow Yard",        say:"Big cows walk and rest here.",              zh:"牛區：大牛在這裡散步、休息。"},
  {id:"plant",     en:"Farm Garden",     say:"We grow green plants here.",                zh:"種植區：這裡種了一排排綠色植物。"},
  {id:"hay",       en:"Hay & Grass",     say:"Cows eat hay and grass every day.",         zh:"牧草區：牛每天都吃牧草和乾草。"},
  {id:"milking",   en:"Milking Cows",    say:"These mom cows give us milk.",              zh:"乳牛區：這些牛媽媽會產牛奶。"},
  {id:"machine",   en:"Milking Machine", say:"This machine helps milk the cows.",         zh:"自動擠乳機：機器幫忙擠牛奶。"},
  {id:"calf",      en:"Baby Calves",     say:"Baby calves drink milk. They are about 40 kilograms!", zh:"小牛區：小牛喝奶長大，剛出生大約 40 公斤！"},
  {id:"classroom", en:"Classroom",       say:"We learn and make fun things here!",        zh:"簡報室：我們在這裡學英文、動手做好玩的東西！"}
];

/* 參觀站（照 Claire 版順序） */
export const STATIONS = [
  {id:"calf", label:"Baby Calves",  zhName:"小牛區", line:{en:"These are baby calves. They are so cute! Let's answer some fun facts.", zh:"小牛區：先聽 Olimomo 介紹，再按 Fun facts 回答問題。"}},
  {id:"hay",  label:"Hay & Grass",  zhName:"牧草區", line:{en:"This is the hay barn. Cows eat hay and grass every day. Let's see what my cow friends like to eat!", zh:"牧草區：牛每天都要吃很多牧草。按 Fun facts 回答問題。"}},
  {id:"yard", label:"Cow Yard",     zhName:"牛區",   line:{en:"This is the cow yard. Big cows live here. They eat a lot every day!", zh:"牛區：大牛住在這裡，每天吃很多。按 Fun facts 回答問題。"}},
  {id:"milk", label:"Milking Cows", zhName:"乳牛區", line:{en:"These are mom cows. They give us milk. Let's answer some fun facts.", zh:"乳牛區：牛媽媽會產牛奶。按 Fun facts 回答問題。"}}
];

/* Fun Facts 問答（station：class＝教室；bonus＝探索模式才出現的進階題）
   註：Claire 版答案裡的「（待學長確認／核對）」備註先不放在學生畫面，等學長確認後再補 */
export const QUIZ = [
  {station:"class", q:"How old is the farm?", fs:"The farm is 53 years old.", zhQ:"崙背和順牧場開了幾年？猜猜看！",
   opts:[["🔢","13"],["🔢","35"],["🔢","53"]], unit:"years old", ans:2, title:"53 years old!", say:"Wow! Olimomo's Farm is 53 years old. That's a very old farm!",
   zhA:"答案：53 年！崙背和順牧場已經開了 53 年囉。那你們幾歲呢？"},
  {station:"calf", q:"How heavy is a baby calf?", fs:"A baby calf is 40 kilograms.", zhQ:"剛出生的小牛有多重？（4 公斤還是 40 公斤？）",
   opts:[["🐈","4 kg"],["🧒","40 kg"]], ans:1, title:"About 40 kg!", say:"A baby calf is about as heavy as you!",
   zhA:"答案：大約 40 公斤！剛出生的小牛差不多跟你一樣重。"},
  {station:"calf", q:"What do baby calves drink?", fs:"Baby calves drink milk.", zhQ:"小牛喝什麼長大？（牛奶還是果汁？）",
   opts:[["🍼","Milk"],["🧃","Juice"]], ans:0, title:"Milk!", say:"Baby calves drink milk every day. They grow big and strong!",
   zhA:"答案：牛奶！小牛每天喝牛奶，慢慢長大。"},
  {station:"calf", bonus:true, q:"What does a newborn calf drink first?", fs:"A newborn calf drinks her mom's first milk.", zhQ:"進階題：剛出生的小牛第一口喝什麼？（媽媽的第一口奶，還是水？）",
   opts:[["🐄","Mom's first milk"],["💧","Water"]], ans:0, title:"Mom's first milk!", say:"The first milk keeps baby calves healthy.",
   zhA:"答案：媽媽的第一口奶（初乳）！初乳有抗體，可以保護小牛不生病。"},
  {station:"calf", bonus:true, q:"What do calves learn to eat when they grow?", fs:"Calves learn to eat hay and grass.", zhQ:"進階題：小牛長大一點，會開始學吃什麼？",
   opts:[["🌾","Hay and grass"],["🍚","Rice"]], ans:0, title:"Hay and grass!", say:"First milk, then hay and grass. Step by step, they grow big!",
   zhA:"答案：牧草！小牛先喝奶，慢慢開始學吃牧草和飼料，長大就斷奶。"},
  {station:"yard", bonus:true, q:"Which cow gives more milk?", fs:"Holstein cows give lots of milk.", zhQ:"進階題：哪一種牛產的奶比較多？（黑白花的荷蘭牛，還是褐色的娟姍牛？）",
   opts:[["holstein","Holstein"],["jersey","Jersey"]], ans:0, title:"Holstein!", say:"Black and white Holstein cows give lots of milk.",
   zhA:"答案：荷蘭牛！黑白花的荷蘭牛（荷士登）是台灣最常見的乳牛，產奶量高。"},
  {station:"yard", bonus:true, q:"Whose milk is extra creamy?", fs:"Jersey cows give creamy milk.", zhQ:"進階題：誰的奶比較濃、比較香？",
   opts:[["holstein","Holstein"],["jersey","Jersey"]], ans:1, title:"Jersey!", say:"Brown Jersey cows give less milk, but it is extra creamy.",
   zhA:"答案：娟姍牛！褐色的娟姍牛體型比較小，奶量比較少，但乳脂比較高，喝起來比較濃。"},
  {station:"milk", bonus:true, q:"How does the machine know each cow?", fs:"Each cow wears a chip. The machine reads it.", zhQ:"進階題：自動擠乳機怎麼知道來的是哪一頭牛？",
   opts:[["💾","A chip"],["🎨","Her color"]], ans:0, title:"A chip!", say:"The machine reads the chip and says, Hello, cow!",
   zhA:"答案：晶片！每頭牛身上有電子晶片（例如項圈），機器一讀就知道是哪頭牛，還會記錄牠擠了多少奶。"},
  {station:"milk", bonus:true, q:"Where does the milk go after milking?", fs:"The milk goes into a cold tank.", zhQ:"進階題：擠完的牛奶先放到哪裡？",
   opts:[["🧊","A cold tank"],["🔥","A hot oven"]], ans:0, title:"A cold tank!", say:"Cold milk stays fresh. Then it goes to the factory.",
   zhA:"答案：冷藏桶！剛擠的牛奶會馬上降溫冷藏保持新鮮，再送去工廠加熱殺菌、包裝。"},
  {station:"hay", bonus:true, q:"Which grass has lots of protein?", fs:"Alfalfa has lots of protein.", zhQ:"進階題：哪一種牧草蛋白質比較多？（苜蓿還是燕麥草？）",
   opts:[["☘️","Alfalfa"],["🌾","Oat hay"]], ans:0, title:"Alfalfa!", say:"Alfalfa has lots of protein. It helps cows grow and make milk.",
   zhA:"答案：苜蓿！苜蓿是豆科植物，蛋白質比較多，幫助牛長肌肉、做牛奶。"},
  {station:"hay", bonus:true, q:"Which one gives cows lots of energy?", fs:"Corn silage gives cows energy.", zhQ:"進階題：哪一種給牛比較多能量？（玉米青貯還是百慕達草？）",
   opts:[["🌽","Corn silage"],["🌿","Bermuda grass"]], ans:0, title:"Corn silage!", say:"Corn silage has lots of energy. Bermuda grass has lots of fiber.",
   zhA:"答案：玉米青貯！整株玉米切碎發酵，澱粉多、能量高；百慕達草是纖維多。"},
  {station:"hay", q:"How many stomachs does a cow have?", fs:"A cow has four stomachs.", zhQ:"牛有幾個胃？（1 個還是 4 個？）",
   opts:[["1️⃣","1"],["4️⃣","4"]], ans:1, title:"Four!", say:"A cow's stomach has 4 parts. They help her eat grass.",
   zhA:"答案：4 個！牛的胃分成 4 個部分，幫助牠消化牧草。"},
  {station:"hay", q:"How much food does a cow eat every day?", fs:"A cow eats 50 kilograms of food a day.", zhQ:"一頭乳牛一天吃多少食物？（5 公斤還是 50 公斤？）",
   opts:[["🥕","5 kg"],["🌾","50 kg"]], ans:1, title:"About 50 kg!", say:"A big cow eats about 40 to 50 kg of hay and grass every day!",
   zhA:"答案：大約 40～50 公斤！一頭大乳牛每天要吃很多牧草和飼料。"},
  {station:"hay", q:"Which one is NOT cow food?", fs:"Cows don't eat candy.", zhQ:"哪一個「不是」牛的食物？",
   opts:[["☘️","Alfalfa"],["🍬","Candy"],["🌾","Oat hay"]], ans:1, title:"Candy!", say:"Cows eat oat hay, alfalfa, Bermuda grass, corn silage and Napier grass. No candy!",
   zhA:"答案：糖果！牛吃的是燕麥草 Oat hay、苜蓿 Alfalfa、百慕達草 Bermuda grass、玉米青貯 Corn silage、狼尾草 Napier grass。"},
  {station:"milk", q:"Do all cows have milk?", fs:"Only mom cows have milk.", zhQ:"是不是所有的牛都有牛奶？",
   opts:[["👍","Yes"],["👎","No"]], ans:1, title:"No!", say:"Only mom cows have milk, after they have a baby calf.",
   zhA:"答案：不是！要生過小牛的牛媽媽才有奶，公牛沒有奶喔。"},
  {station:"milk", q:"Can brown cows give milk?", fs:"Brown cows give milk too.", zhQ:"咖啡色的牛也會產牛奶嗎？",
   opts:[["👍","Yes"],["👎","No"]], ans:0, title:"Yes!", say:"Black and white cows give milk. Brown Jersey cows give milk too!",
   zhA:"答案：會！黑白花的荷蘭牛會產奶，咖啡色的娟姍牛（Jersey）也是乳牛喔。其實所有牛媽媽生完小牛都有奶，乳牛只是奶特別多。"},
  {station:"milk", q:"Can we drink milk right from the cow?", fs:"We heat the milk before we drink it.", zhQ:"剛擠出來的牛奶可以直接喝嗎？",
   opts:[["👍","Yes"],["👎","No"]], ans:1, title:"No! Heat it first.", say:"We heat the milk to kill the germs. Then it is safe to drink!",
   zhA:"答案：不行！剛擠出來的牛奶要先加熱消毒（殺菌），才能安全地喝。"},
  {station:"yard", q:"When does a cow have her first baby?", fs:"A cow has her first baby at two years old.", zhQ:"母牛大概幾歲生第一隻小牛？",
   opts:[["1️⃣","1 year old"],["2️⃣","2 years old"]], ans:1, title:"About 2 years old!", say:"A cow has her first baby calf at about 2 years old. Then she can give milk.",
   zhA:"答案：大約 2 歲（22～24 個月）！生了第一隻小牛之後才會有牛奶。"},
  {station:"yard", q:"How much does a cow's food cost every day?", fs:"A cow's food costs 500 dollars a day.", zhQ:"一頭牛一天吃的牧草和飼料要多少錢？",
   opts:[["🪙","NT$50"],["💵","NT$500"],["💰","NT$5,000"]], ans:1, title:"About NT$500!", say:"One cow eats about 500 dollars of food every day. That's a lot of money!",
   zhA:"答案：大約 500 元！一頭牛一天的牧草加飼料要 500 元左右。"},
  {station:"yard", q:"How much water does a cow drink every day?", fs:"A cow drinks 100 liters of water a day.", zhQ:"一頭牛一天喝多少水？（10 公升還是 100 公升？）",
   opts:[["🪣","10 L"],["🛢️","100 L"]], ans:1, title:"About 100 liters!", say:"That's 50 big bottles of water!",
   zhA:"答案：大約 100 公升！等於 50 瓶 2 公升的大寶特瓶。"}
];

/* 英文練習：問 → 聽示範 → 🎤 說 */
export const PRACTICE = [
  {key:"p_drink", station:"calf", q:"What do you drink every day?", ask:"Baby calves drink milk. What do you drink every day?",
   frame:"I drink ___.", chips:["milk","water","juice","soy milk","black tea","milk tea"], zh:"小牛喝牛奶，那你每天喝什麼？點一張卡，聽一次，再按 🎤 說說看。"},
  {key:"p_cows_eat", station:"hay", q:"What do cows eat?", ask:"What do cows eat?",
   frame:"Cows eat hay and grass.", zh:"牛吃什麼？一起說：Cows eat hay and grass."},
  {key:"p_eat", station:"hay", q:"What do you eat?", ask:"Cows eat hay and grass. What do you eat?",
   frame:"I eat ___.", chips:["rice","noodles","bread","fruit"], zh:"那你吃什麼？點一張卡，用英文說說看。"},
  {key:"p_like_milk", station:"milk", q:"Do you like to drink milk?", ask:"Do you like to drink milk?",
   frame:"___", chips:["Yes, I do.","No, I don't."], zh:"你喜歡喝牛奶嗎？Yes, I do. 或 No, I don't."},
  {key:"p_tastes", station:"milk", q:"What do you think it tastes like?", ask:"What do you think milk tastes like?",
   frame:"I think it tastes ___.", chips:["sweet","yummy","creamy","good"], zh:"你覺得牛奶喝起來像什麼味道？I think it tastes ___."},
  {key:"p_tea_tastes", station:"milk", q:"What does black tea taste like?", ask:"This is black tea. What do you think black tea tastes like?",
   frame:"I think it tastes ___.", chips:["bitter","sweet","good","yummy"], zh:"這是紅茶。你覺得紅茶喝起來像什麼味道？"},
  {key:"p_mix_milk", station:"milk", mix:true, q:"How do you like your milk tea?", ask:"How do you like your milk tea? More milk or more black tea?",
   frame:"I like more ___ and less ___ because it tastes ___.", chips:["creamy","sweet","bitter","yummy"], zh:"你喜歡的奶茶：拉拉看牛奶多一點還是紅茶多一點，再選味道：I like more ___ and less ___ because it tastes ___."},
  {key:"p_spend", station:"yard", q:"How much do you spend a day?", ask:"A cow eats 500 dollars of food a day. How much do you spend a day?",
   frame:"I spend ___ dollars a day.", chips:["20","50","100"], zh:"牛一天吃 500 元，那你一天花多少錢？I spend ___ dollars a day."}
];

export const WICON = {milk:"🥛", water:"💧", juice:"🧃", rice:"🍚", noodles:"🍜", bread:"🍞", fruit:"🍎",
  sweet:"🍬", yummy:"😋", creamy:"🍦", good:"👍", bitter:"😖", "soy milk":"🥛", "black tea":"☕", "milk tea":"🧋",
  "Yes, I do.":"👍", "No, I don't.":"👎", "20":"🪙", "50":"💵", "100":"💰"};

export const GRASS = [
  {w:"Oat hay", zh:"燕麥草", key:"g_oat", em:"🌾", tag:"f"},
  {w:"Alfalfa", zh:"苜蓿", key:"g_alfalfa", em:"☘️", tag:"p"},
  {w:"Bermuda grass", zh:"百慕達草", key:"g_bermuda", em:"🌿", tag:"f"},
  {w:"Corn silage", zh:"玉米青貯", key:"g_silage", em:"🌽", tag:"e"},
  {w:"Napier grass", zh:"狼尾草", key:"g_napier", em:"🎋", tag:"f"}
];
export const TWORDS = [
  {w:"sweet",  zh:"甜的",   key:"tw_sweet",  say:"Sweet. Candy is sweet."},
  {w:"bitter", zh:"苦的",   key:"tw_bitter", say:"Bitter. Black tea is a little bitter."},
  {w:"creamy", zh:"奶香、滑順", key:"tw_creamy", say:"Creamy. Fresh milk is creamy."},
  {w:"yummy",  zh:"好吃、好喝", key:"tw_yummy",  say:"Yummy! I love it!"},
  {w:"good",   zh:"不錯、好喝", key:"tw_good",   say:"Good. It tastes good."}
];

/* Learn more 知識卡（探索模式） */
export const LEARN = {
  farm: {title:"Welcome to Lunbei!", en:["Lunbei is a dairy town in Yunlin.", "There are lots of dairy farms here."],
    items:[{w:"Yunlin", zh:"雲林", em:"🗺️", say:"Yunlin is in the middle of Taiwan."},{w:"Lunbei", zh:"崙背", em:"🏡", say:"Lunbei has lots of dairy farms."},{w:"6 cows", zh:"一開始每戶 6 頭", em:"🐄", say:"Long ago, each farm started with six cows."}],
    zh:"民國 62 年（1973 年），政府在崙背設立酪農專業區，從每戶 6 頭進口荷蘭乳牛開始。民國 91 年時，崙背有 58 戶酪農、約一萬頭乳牛（崙背鄉公所資料）。和順牧場就是從專業區設立那時候開始的。"},
  classroom: {title:"Why can't we touch the cows?", en:["Our hands can carry germs.", "Germs can make cows sick. So, eyes only!"],
    items:[{w:"Eyes only", zh:"只用眼睛看", em:"👀", say:"Eyes only, hands in pockets."},{w:"No germs", zh:"不帶細菌", em:"🦠", say:"We keep germs away from the cows."},{w:"Calm cows", zh:"牛不緊張", em:"😌", say:"Cows feel calm and safe."},{w:"Wash hands", zh:"洗手", em:"🧼", say:"Wash your hands after the farm."}],
    zh:"不能摸牛有兩個原因。第一是防疫：人的手上可能帶著細菌和病毒，傳給牛會讓牛生病；牛身上的病菌也可能傳給人，所以參觀完一定要洗手。第二是動物福利：陌生人突然摸牛會讓牛緊張、受到驚嚇，讓牛安心才是對牛好。"},
  calf: {title:"How do baby calves grow?", en:["Baby calves drink milk first.", "Then they learn to eat hay and grass."],
    items:[{w:"First milk", zh:"初乳", em:"🤱", say:"First, the calf drinks her mom's first milk."},{w:"Milk", zh:"喝奶", em:"🍼", say:"Then she drinks milk every day."},{w:"Hay", zh:"學吃牧草", em:"🌾", say:"Next, she learns to eat hay."},{w:"Big cow", zh:"長大", em:"🐄", say:"At about two years old, she can have a baby calf."}],
    zh:"小牛剛出生約 40 公斤，要盡快喝到媽媽生產後最初的奶（初乳），最慢在出生 12 小時內（農業部資料）。初乳裡面有抗體，幫小牛建立抵抗力。之後每天喝奶，慢慢開始學吃牧草和飼料，長大後就斷奶。母牛大約 2 歲生第一胎，生了小牛才有奶。"},
  hay: {title:"Why do cows eat different grasses?", en:["Cows eat many kinds of grass.", "Mixing them keeps cows healthy and strong!"],
    items:[{w:"Alfalfa", zh:"苜蓿", em:"☘️", tag:"p", say:"Alfalfa has lots of protein."},{w:"Corn silage", zh:"玉米青貯", em:"🌽", tag:"e", say:"Corn silage gives cows energy."},{w:"Oat hay", zh:"燕麥草", em:"🌾", tag:"f", say:"Oat hay has lots of fiber."},{w:"Bermuda grass", zh:"百慕達草", em:"🌿", tag:"f", say:"Bermuda grass has lots of fiber."},{w:"Napier grass", zh:"狼尾草", em:"🎋", tag:"f", say:"Napier grass has lots of fiber."}],
    zh:"牛有四個胃，靠胃裡的微生物慢慢分解牧草，所以吃的種類會影響牛的健康和產奶。苜蓿是豆科植物，蛋白質比較高，幫助長肌肉、做牛奶；玉米青貯是整株玉米切碎發酵，澱粉多，提供能量；燕麥草、百慕達草、狼尾草纖維多，幫助牛反芻和消化。牧場會把幾種牧草混在一起餵，讓牛吃得均衡。"},
  yard: {title:"Holstein and Jersey cows", en:["Black and white cows are Holstein cows.", "Brown cows are Jersey cows."],
    items:[{w:"Holstein", zh:"荷蘭牛", em:"🐄", tag:"m", say:"Holstein cows give lots of milk."},{w:"Jersey", zh:"娟姍牛", em:"🟤", tag:"c", say:"Jersey cows give creamy milk."},{w:"100 liters", zh:"一天喝水 100 公升", em:"🚰", say:"A cow drinks about 100 liters of water a day."},{w:"50 bottles", zh:"＝50 大瓶水", em:"🍶", say:"That's 50 big bottles of water!"}],
    zh:"台灣的乳牛大多是黑白花的荷蘭牛（荷士登），產奶量高；褐色的娟姍牛體型比較小，奶比較少，但乳脂比較高、比較濃。乳牛要生過小牛才會有奶。比一比：一頭乳牛一天大約喝 100 公升的水，等於 50 瓶 2 公升的大瓶水，小朋友一天大約喝 1 公升多。"},
  milk: {title:"A glass of milk's journey", en:["The cow walks into the milking machine by herself.", "Then the milk goes cold, gets heated, and comes to your cup!"],
    items:[{w:"Grass", zh:"牧草", em:"🌾", say:"Cows eat grass."},{w:"Cow", zh:"乳牛", em:"🐄", say:"The cow makes milk."},{w:"Milking", zh:"擠乳", em:"🤖", say:"The machine milks the cow."},{w:"Cold", zh:"冷藏", em:"🧊", say:"The milk goes into a cold tank."},{w:"Heat", zh:"加熱殺菌", em:"🔥", say:"The factory heats the milk to kill germs."},{w:"Your cup", zh:"你的杯子", em:"🥛", say:"Now it's in your cup!"}],
    zh:"和順牧場有自動擠乳機：乳牛自己走進擠乳機，機器讀牛身上的晶片認出是哪頭牛，先清洗乳頭再套上擠乳杯，同時記錄這頭牛擠了多少奶。用擠乳機器人的牧場，乳牛一天平均自己去擠 2.4～3.5 次（一般人工擠乳是 2 次）。擠好的牛奶馬上進冷藏桶降溫，再送到工廠加熱殺菌、包裝，最後才到我們的杯子裡。"}
};
export const LTAG = {p:"Protein 蛋白質", e:"Energy 能量", f:"Fiber 纖維", m:"Lots of milk 奶多", c:"Creamy milk 奶濃"};

/* 回家任務（Padlet 連結照 Claire 版） */
export const PADLET_URL = "https://padlet.com/ClaireOli/padlet-s025io30eeqdbx5g0rjy";
export const RECIPES = [
  {en:"Fresh milk tea", zh:"冰鮮奶茶", tags:["不用刀","不用火"], ing:["fresh milk 鮮奶","cold-brew black tea 冷泡紅茶（茶包＋冷開水）","ice 冰塊（可不加）"],
   steps:["前一晚把紅茶包放進冷開水，冰在冰箱","杯子先倒紅茶，再加鮮奶","搖一搖或攪一攪，試喝：More milk? More tea? 調成你喜歡的味道"]},
  {en:"Banana milk", zh:"香蕉牛奶", tags:["不用刀","不用火"], ing:["banana 香蕉 1 根","fresh milk 鮮奶 1 杯"],
   steps:["香蕉剝皮，放進有蓋的罐子，用叉子壓成泥","倒進鮮奶，蓋緊蓋子用力搖 20 下","倒進杯子，Cheers!"]},
  {en:"Overnight oats", zh:"隔夜牛奶燕麥杯", tags:["不用刀","不用火"], ing:["oats 燕麥片 4 大匙","fresh milk 鮮奶 半杯","fruit 水果（藍莓、葡萄乾…）"],
   steps:["燕麥片放進杯子，倒入鮮奶","蓋好放冰箱一個晚上","早上加上水果就是早餐"]},
  {en:"Panna cotta", zh:"牛奶奶酪", tags:["不用刀","需要大人幫忙加熱"], ing:["fresh milk 鮮奶 250 ml","sugar 糖 1 大匙","gelatin 吉利丁片 2 片"],
   steps:["吉利丁片泡冷水 5 分鐘變軟","請大人把一半的鮮奶和糖加溫（微波約 40 秒，不要煮滾），放進擠乾的吉利丁攪到融化","再倒進另一半冷鮮奶攪勻，倒進杯子冰 4 小時就完成"]}
];
