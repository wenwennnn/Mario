# Software Studio 2023 Spring Assignment 2

### Scoring

|**Basic Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Membership Mechanism|10%|Y|
|Complete Game Process|5%|Y|
|Basic Rules|45%|Y|
|Animations|10%|Y|
|Sound Effects|10%|Y|
|UI|10%|Y|

|**Advanced Component**|**Score**|**Check**|
|:-:|:-:|:-:|
|Leaderboard|5%|Y|
|Offline multi-player game|5%|N|
|Online multi-player game|15%|N|
|Others [name of functions]|1-15%|N|
|one more enemy||Y|
|mobile platform||Y|
|special coin block||Y|
|control volumn||Y|
|Upper edge detection platform||Y|


---

## Basic Components Description : 
1. World map : 
    >有level 1,2兩個關卡，需要第一關破完才能破第二關，並且在兩關前都有game start，在第一關後會自動load第二關，第二關完成後會跳出victory的頁面。  
    並且在死亡後(生命用盡)會跳出gameover頁面，可以選擇回到第一關重完還是回到關卡選擇頁面。
2. Player : 
    >可以通過鍵盤操作，上、左、右 分別控制往上跳、往左走、往右走。在與enemy接觸、下落時會失去一條生命，並回到初始位置。可以透過踩在emeny頭上將他們殺死。
3. Enemies : 
    >烏龜 : 被馬力歐踩頭後變成龜殼，在此狀態下若遇到碰撞就會左右移動，此時若再被馬力歐踩到就會死亡，但若橫向碰撞到馬力歐，就會讓馬力歐死亡。  
    食人花 : 會上下移動，馬力歐碰到會死亡。
    壞香菇 : 橫向碰撞到馬力歐會造成馬力歐死亡，也會被馬力歐踩死。
4. Question Blocks : 
    >錢幣 : 用頭會撞出錢幣。  
    蘑菇 : 用頭會撞出蘑菇，吃了會加一條生命。  
    金磚 : 金磚可以在7秒內無限次撞，每次皆會出現錢幣，是考驗手速的時候了。並且在還沒有被撞過時會有閃亮動畫，撞了第一次並倒數7秒後會變成暗暗的金磚。
5. Animations : 
    >馬力歐 : 走、跳、死亡，以及start win頁面的馬力歐跳舞，皆有用到animation  
    enemy : 蘑菇的走路、死亡，烏龜的走路、變成龜殼，食人花的上下移動、嘴巴開，有用到animation。
    Question block : 一般question block的旋轉，金磚的閃亮，有animation。
    移動平台 : 它的移動就是animation。
6. Sound effects : 
    >BGM : 在menu,select，start，game有三種不同得bgm。  
    Sound effect : 馬力歐跳、死亡、吃香菇、用完生命會有不同的音效。烏龜、壞香菇被踩也有音效。Question block的金幣跳出也有音效。  
    值得一提的是我的馬力歐用盡生命時，為了營造效果，我有稍微暫停一下BGM。
7. UI : 
    >UI介面有player life、player score、timer以及所在關卡。Player life會從database中讀取，會一直持續繼承，而若是你是由第一關直接完到第二關就會繼承第一關的分數，其他狀況則不會。  
    Timer則會行三分鐘的倒數計時，若是三分鐘內還未玩完，就會進入gameover介面。

## Advanced Component Description : 

1. 我有多設計一個enemy，共三個 : 食人花、烏龜、壞香菇。
2. 在關卡中我有設計會移動的平台。
3. 有一種特殊的金磚，在撞到後會有七秒的倒數，期間你只要一直撞就會有金幣。只有一次的機會，若是變成不能撞的狀態則不再閃亮。
4. 在select關卡的頁面可以控制BGM的音量大小。
5. 關卡中有特殊的box只有上緣偵測，平時是可以走過去的(藍色橘色那個)。
6. leader board 放在slect頁面，點按鈕進去即可

# Firebase page link

    https://assignment2-9488b.web.app/