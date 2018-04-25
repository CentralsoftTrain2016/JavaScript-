
//------------------
function disp( s )
{
	document.getElementById("str").textContent 
	  = document.getElementById("str").textContent + s + "\n";
}

//------------------
//会員クラス
class Kaiinn
{
	//コンストラクタ　(new 演算子実行時に呼ばれる)
	constructor( kaiinNo, name, registDate )
	{
		this._kaiinNo 	= kaiinNo;
		this.name 		= name;
		this.registDate = registDate;
	}

	//保持しているデータを文字列化して出力する
	toString()
	{
		return( 
			　"会員番号："   + this.kaiinNo
			+ ", 氏名："    + this.name
			+ ", 登録日時：" + this.registDate
		);
	}
}

//------------------
//フォームから値を取得
function getFromForm()
{
	//会員クラスからインスタンスを作るための値を取得
	let no 			= document.enshuForm4.textInput1.value;
	let name 		= document.enshuForm4.textInput2.value;
	let registDate 	= new Date();

	//会員クラスからインスタンス生成
	let kaiinn = new Kaiinn( no, name,	registDate );

	return kaiinn;
}

//------------------
//フォームをクリア
function clearForm()
{
	document.enshuForm4.textInput1.value =　"";
	document.enshuForm4.textInput2.value =　"";
}

//-----------------
//会員データベース
kaiinDB={};

//-------------------------------
//会員をDBに登録
function registKaiin( kaiin )
{
	//会員番号をキーにして、会員のインスタンスをオブジェクトに登録する
	kaiinDB[ kaiin.kaiinNo ] = kaiin;
}
//------------------
//ブラウザからキックされるメソッド
//登録機能
function regist()
{
	//フォームからデータを取得し会員クラスのインスタンスを生成する
	let kaiin = getFromForm();

	//会員クラスのインスタンスをDBに登録する
	registKaiin( kaiin );

	//フォームをクリアする
	clearForm();
	cls();

	//登録した内容を表示する
	disp( kaiin.toString() + kaiin.kaiinNo );
}

//------------------
//ブラウザからキックされるメソッド
//リストを出力する機能
function getAllKainnList()
{
	//会員DBから値のリストを取得する
	let kaiinList = Object.values(kaiinDB);
	
	let ret = ""; 
	for( let i = 0 ; i < kaiinList.length ; i++ )
	{
		let kaiin = kaiinList[i];
		ret = ret + kaiin.toString() + "\n";
	}
	return ret;
}
/* クラスを使わない場合の実装
function getAllKainnList()
{
	let kaiinList = Object.values(kaiinDB);
	let ret = ""; 
	for( let i = 0 ; i< kaiinList.length ; i++ )
	{
		let kaiin = kaiinList[i];
		ret = ret 
				+ "会員番号：" 	 + kaiin.kaiinNo
				+ ", 氏名：" 	+ kaiin.name
				+ ", 登録日時：" + kaiin.registDate 
				+ "\n";
	}
	return ret;
}
*/

//------------------
// 登録リストを出力する
function listOut()
{
	cls();
	let listStr = getAllKainnList();
    disp( listStr);
}

//------------------
// 会員番号から検索する

function getKaiinStr( no )
{
	let kaiin = kaiinDB[ no ];
	if( kaiin == null )
		return "会員番号：" + no + "は登録されていません。"

	/* クラスを使わない場合の実装
	return( 
			  "会員番号："   + kaiin.kaiinNo
			+ ", 氏名："    + kaiin.name
			+ ", 登録日時：" + kaiin.registDate
		);
	*/
	return kaiin.toString();
}

//ブラウザからキックされるメソッド
//検索機能
function serch()
{
	cls();
	let kaiinNo = document.enshuForm4.textInput1.value;
	let kaiinStr = getKaiinStr( kaiinNo );
	clearForm();
    disp( kaiinStr );
}
//------------------
// 出力をクリアする
//ブラウザからキックされるメソッド
function cls()
{
	document.getElementById("str").textContent = "";
}
//------------------
