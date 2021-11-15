/*
店铺签到，各类店铺签到，有新的店铺直接添加token即可
搬运cui521大佬脚本

cron 0 0 * * * ff_shopsign.js, tag=店铺签到ff
*/
const $ = new Env('店铺签到ff');

const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;

const JD_API_HOST = 'https://api.m.jd.com/api?appid=interCenter_shopSign';

let activityId=''
let vender=''
let num=0
let shopname=''

const token=[
'FEE797596B0EBF0EF543EAC5BD7E4772',
'99BF71AC6AE9A83CA90B93491B588C60',
'E6BE7E787A58E913CFE0B6BB06A075A5',
'3BEB7515E63B176C8908306EECB4EE55',
'6FA21C636A3ABD7E3C2D6521A9B73974',
'8D1135CC83544ED387FB7D68C8AC6B35',
'89585FA846A75EAE377549FAE25509C3',
'3A51333712024E6B40FD551F67AF00E8',
'68B3143B5EDACF371DD831416F62D40C',
'B965ED8C890F3ED137C9373AF200FBAF',
'8274028905F33FF99636C9392E3A05E2',
'BD9243331F2C992C9A99BE531D895DC7',
'8A67F6FE93E09244D019DDF768DF83B7',
'4A44EB5535E5523CDCFF96456415C5B7',
'FBEAD7F1249168F069414A3A703EADF5',
'09C95857184D144BA39E3B915BFBF303',
'BB12D69ADA5FFC38F1A0AFAEE6D1717D',
'6213D1869BFE0E094544D155E96206CF',
'B4F922E35981BC7436917332D3394E9B',
'96D0E0944F39201ED48CC280631DF740',
'B9293DFD9229B9611777274E36803D90',
'000450D4C01042B279499BF6B4AC5ED1',
'01F1D0087D0BF9BBE3D3F4BDB5EEB5B7',
'02B1A156D0CA11610CBA3BE3F44C7C32',
'032B261C8F1A0F2A1E0E2CAB0C134F95',
'0411BBBA911AD207F2BD8DDA06B5DBA0',
'04121F8FC7ECC23649CF26020C462F40',
'068A5DAAB5767D72F659CD8E9CC4EA61',
'071DBC42DD2E666AE25D4849574F55EF',
'07AA6A5BA001EA45B3B93984E254B17C',
'07DA1BDDA18100B6BB8FF78E78C13275',
'07EA3935843BD5E7031662667775C3A5',
'080C69EE5CE3EEFD9DEDF444684DC8F7',
'08327BDFA341884766D2519C6BAD255B',
'083C8C9F979331E1F9AA5A69B43ADFD1',
'08C27B7C079BBEB5C2ABFCEF4D4D4ABB',
'08D41B7B7A8F9632A340AD08786506F5',
'098414CDAA9098842251D136ED275CBE',
'09B47A9E6B0C835238D1BD6BEAE0B73E',
'0AB37675314181FC5A809A6B5E28C142',
'0B7CA216C539677FADE79F1894C3DB4B',
'0BD5B03BBFEA40D57350FD793A846C40',
'0C6A252D11EDB918818AB316C18F7CB2',
'0C74C2F7B936D16C534A22FF19787F83',
'0C765CB67C40EE6EC7B2D78C41F4EEA9',
'0CE9CBC3C8BD5270BE479A70CA1AF330',
'0D0B7E412C882528802E27AF25A0B832',
'0D2F56CDFB142840152463C9D71956B9',
'0D7EF62235C1A3D6430FAE72CD72EE46',
'0D8E167F5BDB2A946985579E6EBEC643',
'0D9FE78D92117BDE1719BFC830FC4E54',
'0DBC515958618681EDAE369B7B43814B',
'0E42B097B72E0B719BCBE5A003006367',
'0EBA89898E391F64E45E2AE5D490EAA5',
'0EDFAE3B347026BE693BAA6F0582CE0C',
'0EE70BF07B76D365F4BF177EA6F69CC1',
'0EF9BBE3E22AA2BA8A7A782E64F7D19B',
'0F64A024AB75D291B70E7E4DD9F9DB41',
'0FA38A3644B8DCBDE7D6391829F1FC41',
'0FBA296839E8609F99B01BC32D96F31A',
'100E51671708C7DB766EBF59BFA00653',
'11DB5AB19C4BD55731EBF66CF15B159B',
'131243499E4BADC6322D031B910B9D4E',
'13962FD30421AC78EB57E9AEB9DB7EBA',
'142FB06D1CD2463B04B23236A02D83F7',
'14791656E189EE9B7CB6E1A13CC60D10',
'14A79CBD037F98CA241DD41CC6ED2003',
'161CAB5DA820B40AAA5FFD2CA1727C7E',
'1668768ED15CA8D886E167B2188555A2',
'177785B9F2372A52DD272693CF37F1F4',
'1857C705716887744BD1BC1B5A72F769',
'195E1765891A9B4E9AC63F21AEC2DD31',
'19D3BD62C2A73CAABF0B1FF6D9BE1DC9',
'19F1BCACF14B4AB83820EB707365276B',
'1A7A2F267C4CBA35EF8770C999FE060B',
'1CBE87E99FEB76D79DEC5AFA4B1BE04E',
'1DF4EB3BC5B04AD060D4E572DA4CEF35',
'1E3DC6DD29C084D2A563DF12A21E1EA0',
'206F0EFBDFDC094D09BFB37F9DAD7356',
'20F1F028472BB36819B8690C419F98D0',
'22FCC16BC5FC5CC873AA7706DBB4E608',
'23169AF6AFB42992B09B2C6898F4C428',
'23D35038234389E50D9F12229551C345',
'23EF5EADE207908E2402DF8182C8F4FB',
'24943BE3AD3DA59B722D60BF92866105',
'2510DFD629075EAB60BF39DCAE3656F2',
'2521C9BFEF0AAE544000BBCBF8F81AA1',
'253BAB21EEC54D6F5A576F8665F6D1C3',
'25BAE60DA59292252AF1EFBA5753B47A',
'25C07F70CFA82AA2E93779837FE0ADE0',
'26E2D1B1A547A1CDA0DD3B89C4C0D7BD',
'27BF6B5BD5771971FCE35A148B726EB7',
'284B1CCECC6743999E91DBBE7CEEF9F8',
'296742A079DD6BC15BC231F9D8A5B292',
'2AB7790F4AE3E81EA57BB616B82323D3',
'2B6A7DF36BFC24BE8B43DC330CDF6B2B',
'2BC110E437C1FF38AB9047D399A4CEC0',
'2CBA60F4AEF251CABF8052EA7A62E1EA',
'2E62245B05DFC43792D8D85CACACFB02',
'2F6BDE0EAD60F8DEFBD89AFAD8A7FBA7',
'302EEE50D037D3BF504A254243F4683E',
'30F18235BF804CDFBAD6C5160B19E540',
'3127A78E6B29E332969D3EA311F5723A',
'31EE6E3434CCCFA7860BFD9119AEB414',
'320E514E98E584EB48A98D71F597083A',
'32D53DAFAD2D04693A4C047493AC95D1',
'3334DE8F06BB357F9751A301F8C91243',
'336C5CD57FAFD04B331C0231B871DC88',
'33C9F47F6BD9C69D97EF6D9B7426D770',
'3537F0A7E95359F82DE49742AD201289',
'35986F2F3C94865A7F56A9D3B1AA1F93',
'36BB26378C0030C2A7B91768FBE6B68A',
'3764BAAABF8FD88D705A1F984DED0C66',
'3798ED19AFE36505B49210A2C885409B',
'37E48203D1EAD45D51B18828C26CAC27',
'37FF2C3A930FF6C7C580FF9E8B24BBD9',
'38646B06052F5B7CFB0FC44A459E852C',
'3A51333712024E6B40FD551F67AF00E8',
'3AF8DA55749B392815BC045D19A0875F',
'3BEB7515E63B176C8908306EECB4EE55',
'3C3CF83BE884BDC0CC85D24EDDFF6FF5',
'3C4644FE7CFB79383B6B47F09B651AA7',
'3D2E711FF410DE8FB348D28DF8374D71',
'3D9CED0691C53755F5A8B421B5E2CD50',
'4005CCEBBAAB42A0C02EF99B421CDEB6',
'405147DEAB1D5BF079A9D2FDB0188249',
'40680B3392081D3BDB96E5B2F69089E8',
'420B97ABECE42CD9965FEF15A326528B',
'4483FE5DA6A7C37667F6A158400E383D',
'449EE25A665C880F3B9C83A96C687B9B',
'44C79094EAB1236590258489F7A7FF9D',
'46CE63BE629358B2A3787276C5A88846',
'46DA88D3AAF1FC0F1186251BD0722E4B',
'4753C34A3F999F817B83246D728B1445',
'47B181268D4AE5C07A8CC517B545198F',
'48186C2C9BC253031771F57AA2276BC1',
'4929C4746C8D35AB6C3427E742A51D40',
'49427BD0E953F72C3160FD7FDCCD716F',
'498BA5601694BB902C22BAA8D5DE66CF',
'4997707A93E60A47939145EFBA94A34D',
'4A521EA1101F539FFD0DE290B29CA324',
'4AA8A680BEF1C01F7D6D4E1EE086D392',
'4B3789A86A8DCE7451D7F9DBF34FB655',
'4BFD3E33E2E5802FD4142AE7D656595A',
'4C63048C6898882D20AE37CC14D0BD0E',
'4D5CA7F7F2D9B68C60FD075D970453DF',
'4D5CF4EF1908514AC37E0BBFCA3D00E2',
'4E318F4B3FDF98A1B8A0923AA53DF7AC',
'4ED02817EECF5DB62FBF90F7A7AB61FA',
'4ED3FE1C9D3A74E53C5DA81ED5BCBC5F',
'4F0D3FE2B58C12E430D6E14D9B790275',
'4F36DAAB018DFDD1B7B4A924AEA2A9B3',
'4F948355010AC388095F0A3B6FAAD912',
'511E9CA0608986B8621E03145309C88C',
'5194F0A0CB97B28F638D90F1889027F9',
'51A708BFB96F825ADE7FF1D600F4C72F',
'51CB1FC17574D9E30F70E1FDE4A3D49B',
'5243F4029A442AA016837CB6500704F3',
'534223CF9554E4305C8976D0C4287E42',
'537E92C63E6542519F52FB87D680B87A',
'53815DCF32E616389035CE86C949CCA2',
'540B0912263D14A24C54A13AAB712B8E',
'558C6587872E81C51FCD30B82F660BCE',
'574C903C081F5B6CFFFA2BB3C159396D',
'575B497E54F79ADA1C8AEDF650450ECB',
'583CD1D61EF6F3D87A0B0A4DC7D2E534',
'592C572CD347B2F3B1FC6FCAE23F9481',
'59318B9BBAB61BDF0A90E640C089908A',
'59E20B14B71F6DB18E0BFE4A22F4E343',
'5AC9D63C407DBD6052A8956CD12BA155',
'5BE8969DA71DE2299EE0D2CB3F88AF50',
'5D75DDC15126578B3E47264F84393FB0',
'5DB02C36C4B3F07128EC7927BA2EE016',
'5DC8F4FD702FB7FFBFEB6413E69DD61D',
'5F42266C3F252C4EA1B9214F4EDCE659',
'5F73404514C45F151B213066EE5F94C5',
'5F746F3497F5E7922E92FA61A749ED7A',
'5F97EA423FEEB66EC198511D5ED1BB03',
'5FF51CBF0E1434E4BADBAE4FDCA7DEB6',
'60811408FD8183DE2176E5630BE1B8EA',
'609B1BCBF27978BAF039A9FCDF206520',
'60B29720119FB3FFC0AB8CC761FE5AFA',
'60FA7BE688D3DD3CA403FE287BC6426C',
'614F01F4DED894F41CEFEB48E822ECAF',
'61ED580999D1B39C1E8812511FE9E9A5',
'623DDF0318F49B251BA0DD4305193058',
'62EB9E53D34EBC64D2DE8937F7CFB7E6',
'63525A3ED6CB36D61BA9BCD50B77CFF7',
'63A344FC8B38FBE5A09409F063B5F0C2',
'6426552A3974195FE2B28DF29128345F',
'649D32654D0E3F0252953884B481E29B',
'64A668CB1415DE5BE241D229E9B5EBD2',
'64B9BDEDC796D874E08A13AACCA518BA',
'64E424325E9FCCE4A15C22846623028E',
'65AAC621682D00F61EFB216B035093D8',
'65D686379D5700D6C8C376D679DBC1AC',
'65F141E3444F4DC3FA955C2FADE79E90',
'6783715D9CA7636318DC3223FAA29DBD',
'67AC1A0B12259B8D2FBCEB415B2A1933',
'68E5E5F2D6548B7B352846036134EBF3',
'697A3B486B1C8DA2190AE06ACB8166CF',
'6AE520E5A117141234079209859E6DEF',
'6C52040FDFEC9CF69B2B85A70E251F9E',
'6E68990FD9124FC8D46808703CBC5B5F',
'6E86E37F39AD7D33EC64B46E7F4A094E',
'6F142726A114D474BA7441C9FE25716E',
'6FA21C636A3ABD7E3C2D6521A9B73974',
'6FCEC9150A2FF15182CD547045CC8DC2',
'6FE2F89129BB0A892DB6ABC24A87091D',
'6FE4F2675CE3B8E785D82D9BBB25EBBE',
'6FEE264769A7060DA5EF2EBF2E312042',
'7044A17DCD8E381C363D0FD787851D97',
'714EA6EDB46A8E28D5835FC49890FACC',
'723CE7AB39E8D5F7D862DABDA6092154',
'7260D2547CF496E144407399EBACC3B0',
'72C2EEBD7D757E06A0C1E63C899DA331',
'733DFFEB3526CC498657F34A4C6187EC',
'73C9F68C82016C0E6B437CCF490B2356',
'73E92500F62200588A9FEEFA29ACA399',
'74122D97F1365A7DB0A79414AA922DD2',
'743E49590A25EB32D1B0C2AC8AD945E2',
'74699F815230DEE9D144F2E02490FC26',
'757CC6744B9F2A10BABE6499F3BF5E1B',
'75940FEBEE7A2EBEE947056F6841277E',
'75FA61192FF707B3DB9E01FAA89D1A1E',
'76809DBCECBA2CA1C2311E1AE119A252',
'77061BA2748F87578292AE45C6958B7D',
'779A1FD11D2AACB1EEBD8FBC390BAC64',
'779F05865264916DFF64B9E0E6F73D1E',
'77ABD23B6CA4A4568BE6EA6CC4F03A51',
'7837E5A7A5F807F5086771F03DFA870D',
'78E07358BFC13889654410FE0CDBF543',
'78E98F119D74D0AE2E57A5DAF0327D23',
'793D16EA926CDC9903D5F8727345EA6E',
'795BC0893EBF4D687497DBC8F78AD203',
'7A085B063B7A155B8B608FA92BB5AC0E',
'7A5D7FA2801D7B1A3A77AA4B1EC4DAB0',
'7AA1514E9B12E9D2577BCA7CA21C320E',
'7B00BF6A42D8D44C7B150B690B481712',
'7B2804E00B33FB4E1D3B1405FCD3A9C6',
'7BCC39E09079F2138D564D3A5106C9E9',
'7D1E5BEE16E2F66917D67408FF0A99F5',
'7DA48F70E892E67B46FE2E09BA408187',
'7E3CBA448E14312E72412A14A629D08A',
'7F4FBAE43523FE3CD8F114AABDEE7956',
'7F51D9D3B90CD0CB241917AE384C39DB',
'7FBE970D94B48FBF93E989D7A4699F06',
'7FC75B8BE7A6ABBCEE42C38A8A1FB2F4',
'7FE5C2FB74916CF678DFC5EBEFFB9F83',
'80823C548BA77BE78AECE1B27BDC9F44',
'80F54BC07A162BC8271DFAAC2C5FBF4C',
'8111EE06946DAB79472DFDF2A13C2DB9',
'817BBE94FCFD8CD970E9D68BEAA55D71',
'81D5A3100BE87FA37C04FE8F2C6DC2B4',
'833B370B58CFCA1BEB2AF4937EED8B7C',
'8430E0CB0CF7FEDB15D4DBA242995BC3',
'848F5271372A0F1CFF6AEFDCF474D487',
'86041313E81F61516D92B0CBA1F2C3E2',
'86F31A29840487B6C06F3D2EA6BEF5A0',
'875D044AC17C79963D5E79FB0EAB6F47',
'876EA4D4B7A42AB3ADEF2F6CB688E82A',
'878568C8B59A639073BF26009DDB9648',
'88008244F490BC80065EC49C184F72FA',
'8809F1168082C018178AC070CF9AF071',
'8897F22B0005A7A4E1B139FA18F8BB7E',
'88B318A761F3AEDD6EB000C0A7767E1C',
'8A50D1772D081BFB923DD3D54248884E',
'8A67F6FE93E09244D019DDF768DF83B7',
'8A865902534B8A45011372C2725B5501',
'8BF57ED55486BD4098A61C11F0B3FD14',
'8C3A782CF2B63FCADA599627830677B1',
'8D1135CC83544ED387FB7D68C8AC6B35',
'8D64AEF24FEDAE08E52C5CE750EFFA8A',
'8DCE6F491CA57BC810507584493ECD01',
'8DDFABBFD828489953ED7A038C6C05BB',
'8DEDF17E478C81A1A3FDE83DDBAD5B8B',
'938EC98AC5A538B527AEC24D3A00DBD9',
'9482C2351B58FBBF1C6FC7643A7DF095',
'9484EF902B298895D61D9BF8E3F74C4F',
'9503DC11F93EABAAF5FABF7CB7F9ACCF',
'9542085FFDB51476EE59D5A6502D67F0',
'955BF4192001D811A1F127653452A7A2',
'9565E88E8609DB7F67F5F95B7A9ACEAC',
'969DCADA3A4F2DCE22B389AD813F2C48',
'96E0C602ED98AA2BC537CAA201FD3E9E',
'975153AAA6E866384E824354181A9027',
'9790C93978E4273A327516B24BC4B186',
'98ACBABC45DD79B92A29600D049F5EB8',
'98C3215FC84DC45E31AC033680F3995C',
'98C5285AF3EBFC4B5C3FD05395239953',
'99A7679D647198976CE683C110088927',
'9A42B3E0E6C8D997543E69D7BA9B4395',
'9A46D7FB45D2A9C37A59CFAAA59DE61A',
'9A73097CAAA72AA89620F0CBEFA69198',
'9A80FF96A0012A4936D686B09663C762',
'9A99CCB04B6382519D82036202C48245',
'9B786E69367D858B3A4A4B4387BF6587',
'9BDC684A2C31AB25C80B2EBC35F5A365',
'9BF3F1E2F3FE978CC8EAF2F948BE74C4',
'9C06A6FF047D5FEEF9DC41D7B6E65E8B',
'9D18AF3F40942E52D521934DC118033C',
'A0608BD461E87ED9D3E89E1F47E192F2',
'A07829156F305401CBC9E9E954DAE30B',
'A08FC86896FAB3965F221F130667F541',
'A18501073FA763E0EC5BDF2AAC748B23',
'A1C9F8232293B2D93710DCB861C32C7A',
'A21CCAE931411473FCD9B73AE2CE2357',
'A2262945EB4AE660D1867B5AE5C1F01C',
'A2C1F73F53B69F27F4F061387E07E609',
'A2E58D5EEA0D790BD5C8C342EE6131C3',
'A2FF8B564E86066EE664EAA9D255B2AF',
'A310B081C692E1D5385C3C4864A84DCE',
'A3BA42B1E9CDCD2D58655C8D2FDC468A',
'A441B1645E8F6A9C62273C8FD3FB0486',
'A45FD5C71DEAB3A840DD68E351473051',
'A4F8F50E0A649EF59F7A1F29B26A096B',
'A514ACF91895AC92019F40528BF9B764',
'A54658675279EEE306AF745BDB7AB33E',
'A5BD6F5690BF855DCC4C40E38D9DA1F1',
'A605B03D1334F2BD01274CB4502AC07F',
'A67811265DDAB3C6EE6105F2D57BFE74',
'A79608C26DFD67126460BFF2EC083B82',
'A7B9A8A519BC02EA5E692D0A0CE92314',
'A81EB76296ECC41CDE24EA3FC0EE37E9',
'A84AC5BA173D5939872C38DCFF7D8B0A',
'A853FEEA2B1E8B4A2A22A5F631E79AD1',
'A8BE019EF5135851EBEA263D21D105D0',
'A9286B105BBF3B5573DC05C978AC3A4F',
'A938BD43CF367CD2ABC9E1C27BB27EEC',
'A9BC60B988A76D492D29FEEE90109D5D',
'A9FCD10BE56A3A4F6DF893131D910FEF',
'AAAEFF87A65032A288C13B8175616568',
'ABD336A7541F868D00D407C1CF31C493',
'ABDD3833FD0ECB8A845AEB856DFD9F46',
'ADBF65F3AD8508C0BE88F2CFA784CEB4',
'ADEDD9A07CA2F4E6D1061C816B50B4F9',
'AE8A0A9C19CC8F8A1D7E3D00D3F27276',
'AECD96F9A4B90B37F8D4C39B7B35974B',
'AEE844172D560B6965A3567811936B29',
'AF0EB36E427B59171971A741B336C58E',
'AF1731B3FD01C8B4F9FBA07C63460F6A',
'B16697AFD411EF566DD4F7786924C73A',
'B2DB45F2E889401C3A0B3E5D4B249C04',
'B32D26A681D5BB482745065BD3ADDD6F',
'B42C27D7BAC98B1543ED15FCA2B338CD',
'B4B039102B021B2D0DAC62D34CA1A18C',
'B4F922E35981BC7436917332D3394E9B',
'B50735021C1F119364CBFE266356791E',
'B5926685F2CCB36502FE848021E50CB8',
'B5E530544AAA35430A00C27E7DC8E1F3',
'B6D954B8EB4A1A94F734BD64394B0F3D',
'B703D97BDF6B44DF6BC9E72346DE21CB',
'B7A41C802FF6C0352FDB3DBF1DABB990',
'B862EE31C8159EC81224A98077BBDB93',
'B86E205410DF9140DECE6F2821A11B9C',
'B88ECF9C66062EA7F4582095176AA576',
'B8A138A0B4555D4AD3C827B6CC5E2405',
'B965ED8C890F3ED137C9373AF200FBAF',
'B9743E41739BFC6373DAACC54004A000',
'B97F8EB51269C46851B256FFC53C8E70',
'B980E2E53C9D9AAE2B37E6E125E98E44',
'B9EC50DD551C238A4797CD25A556C002',
'BA2D9EB203E5AC9627D4D478FE422E72',
'BAC2772A6F09EAAFF0CC37381A144E7D',
'BACF4D4B5C27E14DBD3D29256D93112D',
'BB297F8FCD013C9472F7C4DD70218700',
'BBAA31CAD62ECF732B419AD49194E7A3',
'BBDC1D10FABE819DF5D62C6370417475',
'BC5FE0FF1D2B9E43D38A9C8309478062',
'BC8933EA6FAF0E8615ACE41921618471',
'BDD122D0AA17A32474889E40F960846F',
'BE3329667F67014317C8BBD22A082E9B',
'BEB52747B43A9B0BC000F7B9CFF60724',
'BEED456659211C760D96D4D83CDD0602',
'BF3573E84C9ED4FCCB12454EB4A79B4B',
'BFD39F2ABB2FCF4AB031EB46433A8A9D',
'C0163DBD6BB02A0C86F8F597ACD943F7',
'C05200C02A77DD95C57E091DF5EB72AD',
'C0E0387C63347CA9709FE4B3548F4559',
'C244BBFAFFCA83A8411109D2466EC350',
'C26C92A89CBC9A728FE031B2B51A95EE',
'C27F1CBB97F34C797AA0C30BA4085556',
'C31BC1E35CE9CCD3035611E83D4DF410',
'C3F9BBD6203A2643DE395380EE65B81A',
'C44EEE126B655DAB52BE64F00D33040E',
'C4602D2A3823D2A11504C0EEC05BC4E0',
'C4C322B16B2248604156B6137C164F0D',
'C4EBC2B65015DC0A5B64926AD3D93A15',
'C59F362BA83AFE77F6490E613227A872',
'C641784C76BEC1AC59F827BC5231ED30',
'C661C7898402EC2B811DF2070E3A2822',
'C6BE0B231A350F05A0B5060C2E14E7C0',
'C7166AD16281DEDE24B844502219D68F',
'C859B9DF93B7BFCFCA7533DA03591981',
'C93E5112061D5048ACDF9AE3E22E37F7',
'C9801383620ED78EA15789A4EEAEDC08',
'C9CC200FC136BB753B6486357DA5F1F5',
'CB19766CB2E6F6A3976E0808797B621E',
'CB86BDE8A1B6920C1A8A0188BE98F65B',
'CCFA379727CC3D6FF1BFF43E78D822AE',
'CD9AFD4EBEE3B8C98F17DED1F3A23AD6',
'CDBAE5428A178E8ED22D08F061BDF705',
'CEF59AA312E3B58C9BD310DC08B08BD1',
'CF208AE0EC366A4C4550623307FFC647',
'D0BF077D57DB85780223D8BAD8C25E26',
'D101216513697605F9FBB9A5ECF8C024',
'D11DB9658A4A630BF21E92D92B6731A2',
'D17F907FA0E105D255D62BBE2B247FB5',
'D1B2D08415AC4E1F46A7BA42F234BBB2',
'D1DB64E27A0F109D037037E5D0B5218A',
'D2984D4CE77C7944965493839231BB38',
'D2D82EDE361BF974045540EF46D50A22',
'D4632E86EF2B105664C57C6350870DD4',
'D4B360513D2B3E5584C56E80A7329E22',
'D5502D15267D6DD2A319C1E1F7C6F37E',
'D5648A6B4C304B4C1C8E333928FC3F09',
'D5675B0E959CDF747EB8E8E888FF935A',
'D5F9C2474321FAE22D44BB0F1F026941',
'D5FAC9760E1B22BEA771867E4084ACD1',
'D6D5DAB5E6189C1D67726A0478727561',
'D73F254172D94BD4713F78BDBFB483E0',
'D81691B148AB264C1F05EF4D8BF5D046',
'D839086BD5D523DDB3143B6B19FFD275',
'D8557DC76380E43C9CFB9163266A1D53',
'D8BD980D6472E7F2797AEA74FFED52EA',
'D9178082D9723FD3CF600F627D1FD3E9',
'DA2E9640663912A087B6B8B7B6B71CF3',
'DABAA15D37999CA0F94C5BCF5D97033F',
'DACBDA743EAC06AB01A28F020DD17D66',
'DB228C7CBFF96C03E58C088348CE07D1',
'DB877AD84945DE42637CD1C7900FFA6D',
'DBFC82291815A1EA624E1BC56468D23C',
'DC42409E703B9D25A87EEBC5D390F9C6',
'DCC8F279A3D1817255ADEAE48CFB2B30',
'DCF28C50D018B5AE5BFBA4515B94BA72',
'DE079C940E9611C1B154C947CD4CF51B',
'DE1C07039C6B5C175437D9A0CFE774F3',
'DED2C72DDC172D62E98E76E34877A11B',
'DEFBA674D587F76E8C285B6F8878906C',
'DF0F4EBBD6B64E5F02E1DDDF3A336D2C',
'DF43DB7DFE8B96BFDE1F5550F23A3E41',
'DFA75370B53DD94A1C4E76C675F5A332',
'E06B776A342EF59E22AAFB643B1182D3',
'E11304380F994E9C177BF3DADA7E50B1',
'E15EF71BA551123CF5B9A6454E54102F',
'E207A7B87DF8599E63568153F5FC7EF4',
'E35958E121CCB4D0DA7132EE844B62C7',
'E40326D6D3D13C674FDD2EDF5E55CC18',
'E44B130B7312B72CAF6C37DBA1670E5C',
'E4659CDA47CB285055BF80AA2CF9A4C0',
'E4AE75BC49BA963F2C5C2D059787935E',
'E50A7EA9E22AC9D9A9B183B7C30C7CAE',
'E6638564E46E3DFA08773D4415D7BEA5',
'E69858E5E54E02980C46F25F98FA161F',
'E82FDA40BC1A30078325D5C8F4B2A7BD',
'E8787600F064FF08DD5BED0CB7E3A572',
'E9E46DB3172B14CBC9FC64C6566660C9',
'EA3F7E8AF1AE39B1A2F44412FF3B60C6',
'EA973BDF8BC28B34CCB15CB14D940034',
'EA9ADB8BF0930A9C894DE20071963981',
'EAF5B80569556858855AADA596612804',
'EC365A8D11B5F0EED4F43F5450FE0A91',
'EC665DADE489ADDA4FBC2CD89B98657D',
'EDFF034FA425F6F1E115A8CE4A7172F1',
'EF15BDD6202286D2D77F6337877AB947',
'F1320321020CA4FEE05B56EA25F46B36',
'F15D8B6B6B0B70EA1B8B1DE5446A8EAE',
'F1789D04A1F779C107F4AC93DBD533D7',
'F17E1C9583ACA9F6B5ADBC6D910869F3',
'F1A60E89AE9B5FED2EF63107CB862C97',
'F25CA5F7F5FD060AD1C24D331FC6AD7F',
'F2F0FF3C6D8E0822F9D6EBDB3B60E60F',
'F3CD169FDFA6D2025C7053B3D0A68508',
'F59B28F4EF58DCCD01BE95481F5F5248',
'F692ACBF8DC2AF2F5864988AE86A7194',
'F6AB574AD57A573FCAB27AB4155FD616',
'F71ED06BA14C1D2FAEBC8B0A62F64BB7',
'F777B40A4E989510C2C82F2C0EC64B41',
'F819B1B32183FACA1249A207ADAD742F',
'F84A7BE210611704FFDA54783F603E17',
'F96A8F412113584867D8060C1B48A2A4',
'FA5BFD6EB6630EBEA29255DB67F729BA',
'FB02B8405FF6E3F3000948BA854F042B',
'FB7F18CD461887685D6B8E90304F0352',
'FBA96B8BCEC0812C61612CBD263DD21E',
'FC132C3314636C7E0FDC390A88830764',
'FC456BF7C32B63565789C1B596812925',
'FC65E53226135A32ABBCAB4AA5877CE0',
'FCD4E0CD02A6AB6100E8C63D48FC0F86',
'FCD578B8F6A6EC89FF73E119D3589233',
'FD619B8B0092A264A415F9E5B3EC810A',
'FD7B8276E635CE739CF7BBFA6098C03F',
'FD9D50F03293D936EE67DBE3857C166E',
'FDB78FEE768CB78A0C21DE08FA27D68C',
'FDC74CD04C98CFF5F23A9150C0DCDF75',
'FE047D20B6F278784C20CA4D026DAEE1',
'FE24B42AE585956ABEDE54EEC5793492',
'FEF8FAAB0718D483B45D0DE65FE7129F',
'FF27957B161D94A9C1A0ACAD4362A722',
'FFF5DF7A8D9F2C70E7510F527DA29053',
]
//IOS等用户直接用NobyDa的jd cookie

$.TokenList =[];

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  let cookiesData = $.getdata('CookiesJD') || "[]";
  cookiesData = jsonParse(cookiesData);
  cookiesArr = cookiesData.map(item => item.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  
	$.TokenLists = []
  
        //$.innerTokenList = await getStoreTokee('https://zy.kejiwanjia.com/jd_dpqiandao.php');
        $.innerTokenList = token
	
	$.TokenLists.push(...$.TokenList,...$.innerTokenList);

	
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await babel_diy_zeus();
	  await showMsg()
      //if(i  <1 ) {await showMsg()}
    }
  }
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })

//开始店铺签到
async function babel_diy_zeus(){
	
  for (var j = 0; j < $.TokenLists.length; j++) {
	  
	await $.wait(3000);  
    num=j+1
    if ($.TokenLists[j]=='') {continue}
    await getvenderId($.TokenLists[j])
    if (vender=='') {continue}
    await getvenderName(vender)
    await getActivityInfo($.TokenLists[j],vender)
    await signCollectGift($.TokenLists[j],vender,activityId)
    await taskUrl($.TokenLists[j],vender)
  }
}

//获取店铺ID
function getvenderId(token) {
  return new Promise(resolve => {
    const options = {
      url: `https://api.m.jd.com/api?appid=interCenter_shopSign&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22${token}%22,%22venderId%22:%22%22}&jsonp=jsonp1000`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "referer": 'https://h5.m.jd.com/',
        "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
          //console.log(data)
          data = JSON.parse(/{(.*)}/g.exec(data)[0])
          if (data.code==402) {
            vender=''
            console.log(`第`+num+`个店铺签到活动已失效`)
            message +=`第`+num+`个店铺签到活动已失效\n`
          }else{
            vender=data.data.venderId
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

//获取店铺名称
function getvenderName(venderId) {
  return new Promise(resolve => {
    const options = {
      url: `https://wq.jd.com/mshop/QueryShopMemberInfoJson?venderId=${venderId}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
          //console.log(data)
          data = JSON.parse(data)
          shopName = data.shopName
          console.log(`【`+shopName+`】`)
          message +=`【`+shopName+`】`
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}


//获取店铺活动信息
function getActivityInfo(token,venderId) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22${token}%22,%22venderId%22:${venderId}}&jsonp=jsonp1005`,
      headers: {
        "accept": "accept",
        "accept-encoding": "gzip, deflate",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
         "referer": `https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=${token}&sceneval=2&jxsid=16178634353215523301&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2009753434_&utm_term=fa3f8f38c56f44e2b4bfc2f37bce9713`,
        "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          // console.log(data)
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
          //console.log(data)
          data = JSON.parse(/{(.*)}/g.exec(data)[0])
          activityId=data.data.id
          //console.log(data)
          let mes='';
          for (let i = 0; i < data.data.continuePrizeRuleList.length; i++) {
            const level=data.data.continuePrizeRuleList[i].level
            const discount=data.data.continuePrizeRuleList[i].prizeList[0].discount
            mes += "签到"+level+"天,获得"+discount+'豆'
          }
          //console.log(message+mes+'\n')
          //message += mes+'\n'
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

//店铺签到
function signCollectGift(token,venderId,activitytemp) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_signCollectGift&body={%22token%22:%22${token}%22,%22venderId%22:688200,%22activityId%22:${activitytemp},%22type%22:56,%22actionType%22:7}&jsonp=jsonp1004`,
      headers: {
        "accept": "accept",
        "accept-encoding": "gzip, deflate",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "referer": `https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=${token}&sceneval=2&jxsid=16178634353215523301&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2009753434_&utm_term=fa3f8f38c56f44e2b4bfc2f37bce9713`,
        "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
          //console.log(data)
          data = JSON.parse(/{(.*)}/g.exec(data)[0])
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

//店铺获取签到信息
function taskUrl(token,venderId) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22${token}%22,%22venderId%22:${venderId},%22activityId%22:${activityId},%22type%22:56}&jsonp=jsonp1006`,
      headers: {
        "accept": "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9",
        "cookie": cookie,
        "referer": `https://h5.m.jd.com/`,
        "user-agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
            //console.log(data)
            data = JSON.parse(/{(.*)}/g.exec(data)[0])
            console.log(`已签到：`+data.data.days+`天`)
            message +=`已签到：`+data.data.days+`天\n`
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

async function showMsg() {
  if ($.isNode()) {
    $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n${message}`);
    //await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n${message}`);
  }
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": `jdapp;android;9.3.5;10;3353234393134326-3673735303632613;network/wifi;model/MI 8;addressid/138719729;aid/3524914bc77506b1;oaid/274aeb3d01b03a22;osVer/29;appBuild/86390;psn/Mp0dlaZf4czQtfPNMEfpcYU9S/f2Vv4y|2255;psq/1;adk/;ads/;pap/JA2015_311210|9.3.5|ANDROID 10;osv/10;pv/2039.1;jdv/0|androidapp|t_335139774|appshare|QQfriends|1611211482018|1611211495;ref/com.jingdong.app.mall.home.JDHomeFragment;partner/jingdong;apprpd/Home_Main;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36`
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie过期
              return
            }
            $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}

function getStoreTokee(url) {
  return new Promise(async resolve => {
    const options = {
      "url": `${url}?${new Date()}`,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
      const tunnel = require("tunnel");
      const agent = {
        https: tunnel.httpsOverHttp({
          proxy: {
            host: process.env.TG_PROXY_HOST,
            port: process.env.TG_PROXY_PORT * 1
          }
        })
      }
      Object.assign(options, { agent })
    }
    let res = []
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
        } else {
          if (data) res = JSON.parse(data)
        }
      } catch (e) {
        // $.logErr(e, resp)
      } finally {
        resolve(res || []);
      }
    })
    await $.wait(10000)
    resolve(res);
  })
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
