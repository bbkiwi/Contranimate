var BillQuestion = false;
//bill for debugging

function WhoAreEnds() {
    var indices = [];
    var idx;
    for (idx = 0; idx < dancer.length; idx++) {
        if (dancer[idx].e) indices.push(idx);
    }
    return indices;
}

function WhoIsNotFinished() {
    var indices = [];
    var idx;
    for (idx = 0; idx < dancer.length; idx++) {
        if (!dancer[idx].f) indices.push(idx);
    }
    return indices;
}

function getStack() {
    // http://stackoverflow.com/questions/8211264/javascript-find-calling-function
    var fnRe = /function\s*([\w\-$]+)?\s*\(/i;
    var caller = arguments.callee.caller;
    var stack = "Stack = ";
    var fn;
    while (caller) {
        fn = fnRe.test(caller.toString()) ? RegExp.$1 || "{?}" : "{?}";
        stack += "-->" + fn;
        caller = caller.arguments.callee.caller;
    }
    ;
    return stack;
}
function consts() {
    TopDancerId = 19;        // number of dancers -1
    callerx = 1100;         // caller x from upper left +x is to the right
    callery = 150;          // caller y from upper left +y is down
    callerc = 0x00c0c0;     // caller color
    still = 40;             // beats*10 at the start
    cycle = 640;            // beats*10 in a cycle
    numbeatperstep = 10;    //bill beats*10 per single step
    intv = 50;              // animation interval
    dw = Math.round(dsp / 2); // dancer width
    dh = Math.round(dsp / 8); // dancer head radius
    dt = Math.round(dsp / 8); // dancer thickness
    dcm = 0x4040ff;        // man color
    dcw = 0xff00ff;        // woman color
    dcm0 = 0x8080ff;        // man dancertoinspect
    dcw0 = 0xffc0ff;        // woman dancertoinspect

    // the p or op, o and n are mark mnemonic reddish, greenish, blueish
    dcSelp = 0xff0040; //red - color of selected dancers p
    dcSelop = 0xff8000; //orange - color of selected dancers op (original partner)
    dcSelo = 0x40f040; //ligh green - color of selected dancers o
    dcSeln = 0x6060ff; //blue - color of selected dancers n
    dc3 = new Array(       // 3d dancer colors

        0xff0040,           // red
        0xff8000,           // orange
        0x00a000,           // dark green
        0xf0f040,           // yellow
        0x6060ff,           // blue
        0x40f040,           // light green
        0x00a0a0,           // teal
        0x40f0f0,           // cyan
        0xa040ff,           // violet
        0xff80ff            // magenta

    );
    fc = 0xa06020;        // floor color
    gc = 0xb07030;        // grid color
    tc = 0x000000;        // floor text color
    tcd = 0x000000;        // dancer text color
    ftd = "8pt Arial";      // dancer font
    gd0 = 1;                // initial grid 1 yes 0 no
    hresi = 0;              // half resolution time display? 0 full, 1 half
    //prescan = false;         // prescan helps get dancers at the ends in place early
}
a = new Array;

a[0] = "Amy's Harmonium - Cary Ravitz\nbecketccw\nlonglineswomenroll\nmenallemanderight1.5spin\nbalanceandswing\nchain\ncirclepassthrough\norbit\nswing\n";
a[1] = "Around the Sound - Cary Ravitz\nbecket\nlinesgypsytake\nswingoffcenter\nhalfheypassleft\nswing\nlinesgypsylines\nstarrightallemandeprogression\nswing\n";
a[2] = "Autumn Air - Cary Ravitz\nbecket\nchain\nhalfheypassright\nbalanceandswing\nmenallemandeswing\ncirclepassthroughcircle\n";
a[3] = "Be Here Now - Robert Cromartie\nimproperwaves\nbalanceside\nwomenallemandeleft1\nhalfhey2passright\nbalanceandswing\nmenallemandeswing\ncirclepassthrough\ndosidotoawave\n";
a[4] = "Becket Eyes - Cary Ravitz\nbecket\nlonglines\nchainstarleftprogress\nswing\nhalfheypassleft\nmenallemandeleft1.5\ngypsyandswing\n";
a[5] = "Becky's Becket - David Zinkin\nbecket\ncirclepassthrough\nswing\nlonglines\nchain\nheypassright\nbalanceandswing\n";
a[6] = "Bev's Becket A - Cary Ravitz\nbecketdiagonal\nforwardleft\nchaintwirl\nheypassright\nbalanceandswing\ncircle.75\nswing\n";
a[7] = "Bev's Becket B - Cary Ravitz\nbecketdiagonal\nforwardleft\nchaintwirl\npushoffheypassright\nbalanceandswing\nmenallemandeswing\n";
a[8] = "Boomerang - Gene Hubert\nbecket\nlonglines\nrightandleftthrough\nchain\nchainleft\npassthroughcirclepassthrough\nbalanceandswing\n";
a[9] = "Breakup Breakdown - Cary Ravitz\nimproperfaceacross\nlolpassthroughacross\nbalanceandswing\nmenallemandeswing\ncirclepassthrough\nstarleft1progress\ndosido\nswing\n";
a[10] = "Call Me - Cary Ravitz\nbecketccw\nrightandleftthrough\nchainstarleftprogress\nswing\ncircle.75\nlolhalfheypassleft\nbalanceandswing\n";
a[11] = "Chicory - Cary Ravitz\nbecket\nallemande1starpromenadeslide\nwomenallemanderight1.5\nswing\ncircle.75\nlolhalfheypassleft\nbalanceandswing\n";
a[12] = "Contrablend - Cary Ravitz\nimproper\nbalanceandswing\ncircleswing\nlonglineswomenroll\nlonglineswomenroll\nlolcircleright.75progress\ngypsy1.5progress\n";
a[13] = "Crosswalk - Cary Ravitz\nbecketccw\ncircleswing\nhalfheypassright\nbalanceandrotate\nbalanceandrotate\nbalanceandrotate\ngypsyandswing\n";
a[14] = "Daisy Chain - Cary Ravitz\nbecket\nlonglineswomenrollmenchainleft\nstarleft.75\nchainright\nhalfheypassright\nwomenallemanderight1.5\nbalanceandswing\n";
a[15] = "Dancing Spell - Cary Ravitz\nimproper\nbalanceandswing\ncircle1\nstarleft1\nmenallemandeswing\nrightandleftthroughchainprogress\n";
a[16] = "Dar Trek A - Cary Ravitz\nbecketccw\nhalfheypassleftprogress\nlolstarleft.75progress\ndosido\nswing\ncirclebalancecaliforniatwirl\nbalanceandswing\n";
a[17] = "Dar Trek B - Cary Ravitz\nbecketccw\nlonglines\nhalfheypassleftprogress\nlolstarleft.75progress\nswing\ncirclebalancecaliforniatwirl\nbalanceandswing\n";
a[18] = "Debra's Dance A - Cary Ravitz\nbecket\ncirclepassthrough\nswing\nlonglines\npassthroughallemandetowave\nbalanceslide +all,75\nbalanceslide +men,-75,*pc\nbalanceslide =women,-75,*ic\nallemandeleft +men,4,180,0,*p\nstep =women,0,4,0,0,0\nswing\n";
a[19] = "Debra's Dance B - Cary Ravitz\nbecketdiagonal\nforwardleft\npassthroughallemandetowave\nbalanceslide +all,75\nbalanceslide +men,-75,*pc\nbalanceslide =women,-75,*ic\nallemandeleft +men,4,180,0,*p\nstep =women,0,4,0,0,0\nswing\ncircleswing\n";
a[20] = "Double Boomerang - Gene Hubert\nbecket\nlonglines\nmenallemandeswing\nchainleft\nlonglines\npassthroughcirclepassthrough\nbalanceandswing\n";
a[21] = "Double Whirl - Cary Ravitz\nbecketccw\ncircle.75progress\nlolcircleright.75faceacross\nrolltowhirlhold\nwhirlstarpromenade\nheypassright\nbalanceandswing\n";
a[22] = "Dreaming - Cary Ravitz\nbecket\nlonglines\nhalfheypassrightprogress\nstarright.75\nswing\ndosido\nlolstarleft.75progress\nbalanceandswing\n";
a[23] = "Ellen's Yarns - Rick Mohr\nbecket\nrightandleftthrough\nstarleft1\nchainright\nchain\npetronella\nlolpetronellaprogress\nbalanceandswing\n";
a[24] = "Enchanted - Cary Ravitz\nbecketccw\ncircle.75\nlolhalfheypassleft\nbalanceandswing\nlinesgypsylines\nstarleftallemandeprogression\nswing\n";
a[25] = "Entranced - Cary Ravitz\nbecketccw\nlonglines\nhalfheypassright\nstarright.75\nswing\npassthroughacross\nstarleftallemandeprogression\nswing\n";
a[26] = "Evil Diane - Cary Ravitz\nbecket\nlollonglinesmenroll\nchainleft\nstarleft1\nchainright\nlollonglinesmenroll\nwomendosido\nbalanceandswing\n";
a[27] = "First Hey - Paul Balliet\nimproper\nallemandeleft1.5\nchain\nheypassright\nbalanceandswing\ncirclebalancepassthrough\n";
a[28] = "Flirting with Love Again A - Cary Ravitz\nbecket\nlonglines\ncircle1\nchainleft\nchainright\nstarleft1progress\nallemanderight1.5progress\nbalanceandswing\n";
a[29] = "Flirting with Love Again B - Cary Ravitz\nbecket\nlonglineswomenroll\nlollonglinesmenroll\nchainleft\nchainright\nstarleft1progress\nallemanderight1.5progress\nbalanceandswing\n";
a[30] = "Flying Flamingos - Cary Ravitz\nimproper\nallemanderight1.5\nhalfheypassleft\ngypsyandswing\ncircleswing\nstarleft.75\nallemandeleft1.5progress\n";
a[31] = "Four on the Floor - Cary Ravitz\nbecketccw\nrightandleftthrough\nchainleft\nstarlefttowavystar\nbalanceandslidewavystarright\nbalanceandslidewavystarleft\nstarleft.875progress\nbalanceandswing\n";
a[32] = "Galax - Cary Ravitz\nbecket\ncircle1\nstarleft1\nallemande1starpromenadeslide\npushoffheypassright\nbalanceandswing\n";
a[33] = "Gypsy Star - Cary Ravitz\nimproper\nbalanceandswing\nmengypsywaveswithends\nlolgypsystar.75swing\nrightandleftthrough\ncircle.75\n";
a[34] = "Gypsy Waves - Cary Ravitz\nbecket\ngypsywaves\ngypsystar.75swing\nallgypsywaveswithends\nlolgypsystar.75ccw\ngypsyandswing\n";
a[35] = "Heart of Glass - Cary Ravitz\nbecket\ncirclepassthrough\nswing\nallemande1.5starpromenade\ngypsyheypassright\nbalanceandswing\n";
a[36] = "Janet's Gypsy - Cary Ravitz, Janet Bertog\nbecket\ncircleswing\nrightandleftthrough\nhalfmadrobinwomenforwardleft\nhalfmadrobinmenforwardright\nlolhalfheypassleft\nwomenallemandeleft1.5\ngypsyandswing\n";
a[37] = "Janet's Journey - Cary Ravitz\nbecket\nlonglineswomenroll\nlolcircleright.75\nallemandeleft +all,6,360,-10,*hp\nswing\njourney\nbalanceandswing\n";
a[38] = "Jubilation - Gene Hubert\nimproper\nbalanceandswing\nmenallemandeleft1.5\nallemanderight +all,8,450,0,*h\nlolhalfheypassleft\nswing\nlonglines\nchainprogress\n";
a[39] = "Jubilation Variation - Cary Ravitz\nimproper\nbalanceandswing\ncircleswing\nhalfheypassleft\nswing\nrightandleftthroughchainprogress\n";
a[40] = "Judy's Journey - Cary Ravitz\nreverseimproper\ndosido\nswing\njourney\nbalanceandswing\nrightandleftthrough\nstarleft.75progress\n";
a[41] = "Jump Start - Cary Ravitz\nimproper\nbalanceandswing\nrightandleftthrough\nhalfheypassright\nstarright.75\nswing\ncirclepassthroughdosido\n";
a[42] = "Laura's Lilt - Cary Ravitz\nbecket\npromenadetonext\nchain\nstarleft1.25progress\nallemanderight1progress\ngypsyleft1.5\nhalfheypassright\nbalanceandswing\n";
a[43] = "Living in Zen - Cary Ravitz\nreverseimproper\ngypsyandswing\nmenallemandeleft1.5\ngypsy +all,8,450,*ha3\nlolhalfheypassleft\nswing\nhalfheypassleft\nstarleft.75progress\n";
a[44] = "Looking for Love Again - Cary Ravitz\nbecketccw\nlonglineswomenroll\nlolcircleright.75\nchainleft\nchainright\npetronella\nbalanceandslideprogress\nbalanceandswing\n";
a[45] = "Mad Max - Cary Ravitz\nbecketccw\nlolrightandleftthrough\nhalfmadrobinmenforwardleft\nhalfmadrobinwomenforwardright\nhalfpushoffheypassleft\nswing\nhalfmadrobinmenforwardright\nhalfmadrobinwomenforwardleft\nlolhalfpushoffhey2passright\nbalanceandswing\n";
a[46] = "Maliza's Magical Mystery Motion - Cary Ravitz\nbecketccw\nmenallemandeswing\npromenade\nchain\npetronellaprogress\nlolpetronella\nbalanceandswing\n";
a[47] = "March of the Coffee Zombies - Cary Ravitz\nbecket\nlonglineswomenroll\nlolcircleright.75progress\ncircle.75\nlolbalanceandslideacrosstogypsyandswing\nmenallemandeswing\n";
a[48] = "Martha's Breakup Breakdown - Cary Ravitz\nbecketccw\nalleleftmiddle +all,6,360,*3\nswing\ncircle.75\nswing\nrightandleftthrough\nstarleft1progress\nstarright.75\nswing\n";
a[49] = "Mary Keith's Harmonium - Cary Ravitz\nbecketccw\nhalfheypassleft\nmenallemandeleft1.5spin\nbalanceandswing\npassthroughcirclepassthrough\norbit\nswing\n";
a[50] = "Megadance - Cary Ravitz\nbecketccw\nmenrollleftwithends\nmenrollleftwithends\npetronella\nbalanceandslideprogress\nswing\npetronella\nbalanceandslideprogress\nbalanceandswing\n";
a[51] = "One Way or Another A - Cary Ravitz\nimproper\ncircleright.75faceacross\nhalfpushoffheypassright\nbalanceandswing\nhalfpushoffheypassleft\nswing\nrightandleftthrough\ncirclepassthrough\n";
a[52] = "One Way or Another B - Cary Ravitz\nbecket\npromenade\nhalfpushoffheypassright\nbalanceandswing\nhalfpushoffheypassleft\nswing\ncirclepassthroughcircle\n";
a[53] = "Passion Breakdown A - Cary Ravitz\nimproper\nbalanceandswing\nhalfheypassright\nmadrobinwomenforwardleft\nwomencrossswing\ncirclebalancecaliforniatwirl\n";
a[54] = "Passion Breakdown B - Cary Ravitz\nimproper\nbalanceandswing\nhalfheypassleft\nmadrobinmenforwardright\nmencrossswing\ncirclebalancepassthrough\n";
a[55] = "Pigtown Breakdown - Cary Ravitz\nbecketccw\npetronellaprogress\nswing\nrightandleftthrough\nforwardright\nrightandleftthrough\npetronellaprogress\nbalanceandswing\n";
a[56] = "Pigtown Petronella - Cary Ravitz\nbecketccw\nmenallemandeswing\nrightandleftthrough\nchainleft\npetronellaprogress\nlolpetronellaprogress\nbalanceandswing\n";
a[57] = "Pigtown Swing - Cary Ravitz\nbecket\nlonglineswomenroll\nrightandleftthrough\npetronellaprogress\nswing\npetronellaprogress\nswing\nhalfheypassleft\nswing\n";
a[58] = "raDar Love B - Cary Ravitz\nbecketdiagonal\nforwardleft\nhalfheypassright\nallemandeleft +all,4,360,-10,*sh4\nstarleft.75\nalleleftmiddle +all,4,360,*lo4\nbalanceandswing\ncircleswing\n";
a[59] = "Reel Easy - Cary Ravitz\nimproper\ndosido\nswing\nlonglines\nwomenallemanderight1.5spin\nbalanceandswing\ncircleallemandepullbyprogress\n";
a[60] = "Reel to Reel - Cary Ravitz\nimproperwaves\norbitrtr\ngypsyandswing\nwomengiveandtake\nswing\ncirclepassthrough\ndosidotoawave\n";
a[61] = "Reflections A - Cary Ravitz\nimproper\nbalanceandswing\nmenallemandeswing\npromenade\nchain\npassthroughacrossprogress\nlolcircle1\nlolpassthroughupdownprogress\nbalanceandswing\nmenallemandeswing\npromenade\nchain\npassthroughcirclepassthrough\n";
a[62] = "Reflections B - Cary Ravitz\nimproper\nbalanceandswing\nmenallemandeswing\nlonglines\nchain\npassthroughcirclepassthrough\n";
a[63] = "Reunion - Gene Hubert\nbecketdiagonal\nchainleft\nchain\nheypassrightprogress\nbalanceandswing\ncirclepassthroughcircle\n";
a[64] = "Revolution Reel - Tom Hinds\nimproper\ngypsyandswing\ncircleswing\nrightandleftthrough\nchain\npetronella\nlolpetronellaprogress\n";
a[65] = "Rhyme or Rhythm - Cary Ravitz\nreverseimproper\nbalanceandswing\nrightandleftthrough\nhalfheypassright\nstarright.75\nswing\nhalfheypassleft\nstarleft.75progress\n";
a[66] = "Roadkill - Cary Ravitz\nbecket\nlollonglinesmenrollwithends\nrightandleftthrough\npetronellaprogress\nswing\nrightandleftthrough\npetronellaprogress\nbalanceandswing\n";
a[67] = "Rocky Road - Cary Ravitz\nbecketccw\nlonglineswomenrollwithends\nrightandleftthrough\nstarleft.75progress\nswing\ncircleallemandeprogress\nbalanceandswing\n";
a[68] = "Rollin' and Tumblin' - Cis Hinkle\nimproper\nbalanceandswing\nlonglineswomenroll\nlollonglinesmenroll\nwomenallemanderight1.5spin\nswing\nchainstarleftprogress\n";
a[69] = "Sealed with a Keith - Cary Ravitz\nbecketccw\nrightandleftthrough\nchainleft\ncirclepassthrough\ngypsy1.5progress\nallemandeleft1.5\nhalfheypassrightprogress\nbalanceandswing\n";
a[70] = "Simplicity Swing - Becky Hill\nimproper\nbalanceandswing\ncircleswing\nlonglines\nchainstarleftprogress\ndosido\n";
a[71] = "Slice and Dice - Cary Ravitz\nbecket\nlonglineswomenrollwithends\nforwardleftbackright\nlolstarleft1progress\nswing\nforwardleftbackright\nlolstarleft1progress\nbalanceandswing\n";
a[72] = "Slipstream - Cary Ravitz\nbecket\nlonglines\nwomenallemanderight1.5\nbalanceandswing\nrightandleftthrough\nstarrightallemandeprogression2\nswing\n";
a[73] = "Snake in the Hey - Cary Ravitz\nimproperfaceacross\nsnakeheywaves\nallemandeleft +men,4,270,0,*pv3\nstep =women,0,4,-63,50,0\nboxthegnat\nhalfhey2passright\nbalanceandswing\nrightandleftthrough\nchain\n";
a[74] = "Solstice Special - Tony Parkes\nimproper\ndosido\nswing\nlonglines\nmenallemandeleft1.5\ngypsyandswing\npromenade\ncirclepassthrough\n";
a[75] = "Songbird - Cary Ravitz\nbecket\ncircleswing\ncircle.5faceacross\nmadrobinmenforwardright\nhalfpousettemenforwardright\nmadrobinwomenforwardleft\nhalfpousettewomenforwardleft\nstep2 +men,0,4,90,-50,0,-85,*\nstep2 =women,0,4,-80,50,0,45,*\nbalanceandswing\n";
a[76] = "Southern Spring A - Cary Ravitz\nimproper\nbalanceandswing\nmadrobinmenforwardright\nhalfheypassleft\nmenallemandeleft1.5\nswing\ncirclepassthroughdosido\n";
a[77] = "Southern Spring B - Cary Ravitz\nimproper\ndosido\nswing\nmadrobinmenforwardright\nmenallemandeleft1.5\nbalanceandswing\nrightandleftthrough\ncirclepassthrough\n";
a[78] = "Starburst - Cary Ravitz\nimproper\nbalance\nboxthegnat\nstarright1\nchain\nstarleft1\ngypsyandswing\ncirclepassthroughdosido\n";
a[79] = "Starcrossed - Cary Ravitz\nbecketccw\nhalfheypassrightprogress\nlolstarright.75\nbalanceandslideprogress\nswing\nstarright.75\nbalanceandslideprogress\nswing\n";
a[80] = "Starfire - Cary Ravitz\nbecketccw\nlonglines\nwomenallemanderight1.5spin\nbalanceandswing\nhalfheypassleftprogress\nstarleft1\nlolgypsystar.75swing\n";
a[81] = "Stephanie's Star - Cary Ravitz\nimproper\nbalanceandswing\nrightandleftthrough\nstarleft1\ngypsystar.75swing\ncirclebalancecaliforniatwirl\n";
a[82] = "Streetsboro Daisies - Cary Ravitz\nimproper\nallemandeleft1.5\nhalfheypassright\nbalanceandswing\nmenallemandeswing\ncircle.75\nallemanderight1.5progress\n";
a[83] = "Susan's Slide - Cary Ravitz\nbecketdiagonal\nforwardleft\npassthroughallemandetowave\nlolbalanceandslideacrosstoswing\npassthroughallemandetowave\nlolbalanceandslideacrosstogypsyandswing\n";
a[84] = "Susan's Snafu - Cary Ravitz\nbecketccw\npetronellaprogress\nlolpetronellaprogress\nstarright.75\nswing\nchain\nstarleft1progress\nbalanceandswing\n";
a[85] = "Susan's Swing - Cary Ravitz\nbecketccw\nlonglineswomenroll\nlollonglineswomenroll\ncircle.75progress\nswing\nhalfheypassleft\nmenallemandeleft1.5\nbalanceandswing\n";
a[86] = "Swing Fever - Cary Ravitz\nimproper\nbalanceandswing\npassthroughacrossprogress\ngypsyandswing\nmenallemandeswing\ncirclepassthrough\ndosido\n";
a[87] = "The Nice Combination - Gene Hubert\nimproper\nbalanceandswing\ndownthehall\ncircleswing\nchainstarleftprogress\n";
a[88] = "The Slippery Slope - Cary Ravitz\nbecket\nrightandleftthrough\npassthroughallemandetowave\nlolbalanceandslideacrosstoswing\nlolpassthroughallemandetowave\nbalanceandslideacrosstoswing\n";
a[89] = "The Zombies of Sugar Hill - Gene Hubert\nimproper\nbalanceandswing\ncircle.5faceacross\nslidecircle\ncaliforniatwirl\nbalanceandswing\nchainstarleftprogress\n";
a[90] = "Through the Looking Glass - Cary Ravitz\nbecket\ncirclepassthrough\nswing\nhalfheypassleft\nallemande1.5starpromenade\nhalfheypassright\nbalanceandswing\n";
a[91] = "Trillium - Cary Ravitz\nbecket\nallemande1starpromenadeslide\nhalfheypassright\nwomenallemanderight1.5spin\nbalanceandswing\ncircleswing\n";
a[92] = "Trinity - Gene Hubert\nimproperfaceacross\nlollonglinesfaceupdown\nswing\nchain\nstarleft1\nstarright1\nswing\ncirclepassthrough\nswing\n";
a[93] = "Trinity 2 - Cary Ravitz\nbecket\ncirclepassthrough\nswing\ndosidoacrosstonext\nswing\nchain\nstarleft.75\nlolgypsystar.75swing\n";
a[94] = "Waterfall - Cary Ravitz\nbecket\nlonglineswomenroll\nlolcircleright.75progress\nallemandeleft1.5\nhalfheypassright\nbalanceandswing\nmenallemandeswing\n";
a[95] = "Where Will I Be - Cary Ravitz\nbecketccw\nlollonglinesmenroll\npetronella\nlolstarleft1progress\nswing\npetronella\nlolstarleft1progress\nbalanceandswing\n";
a[96] = "Whim's Gym A - Cary Ravitz\nimproper\ndosido\nswing\nrightandleftthrough\nwomenallemanderight1.5spin\nbalanceandswing\nwhim\n";
a[97] = "Whim's Gym B - Cary Ravitz\nimproper\ndosido\nswing\nrightandleftthrough\nwomenallemanderight1.5spin\nbalanceandswing\ncirclebalancecaliforniatwirl\n";
a[98] = "Whirlaway - Cary Ravitz\nbecket\nslidecircle\ncircleright1faceacross\nrolltowhirlhold\nwhirlstarpromenade\nhalfheypassright\nwomenallemanderight1.5spin\nbalanceandswing\n";
a[99] = "Whitewater - Cary Ravitz\nbecket\nlonglineswomenrollwithends\nlonglineswomenrollwithends\nlolcircleright.75progress\nswing\ncircleallemandeprogress\nbalanceandswing\n";
a[100] = "Wildflowers A - Cary Ravitz\nbecket\ncirclepassthrough\nswing\nallemande1starpromenade\nchain\nhalfheypassright\nbalanceandswing\n";
a[101] = "Wildflowers B - Cary Ravitz\nbecket\nallemande1starpromenade\nchain\nhalfheypassrightprogress\nbalanceandswing\ncircleswing\n";
a[102] = "Winter Wind - Cary Ravitz\nbecketccw\nlonglineswomenroll\nlolcircleright.75\nbalanceandswing\npetronella\nlolpetronellaprogress\nlolstarright.75\nswing\n";
a[103] = "Woven Waves - Cary Ravitz\nimproper\nbalanceandswing\ngypsywaves\ngypsystar.75swing\ncirclepassthroughdosido\n";
a[104] = "Elizabethan Gypsy - Bill Baritompa\nbecket\nmenallemandeswing\npromenade\nchainright\nheypassrightprogress\ngypsyandswing\n";
// a[105]="Presto Petronella - Cary Ravitz\nbecketccw\nrightandleftthrough\nchainleft\ncirclepassthrough\ngypsy1.5\npetronella\npetronella\nbalanceandswing\n";
// a[ 70]="Serenade - Cary Ravitz\nbecket\nlonglineswomenrollmenchainleft\nstarleft.75progress\ngypsy1.5progress\nallemandeleft1.5\nhalfheypassrightprogress\nbalanceandswing\n";

//bill the movement of a dancers is described by piecewise arcs and lines with
//  angle varying as dancer moves. 
//  pathi = dancer[].i index of pathsegment
//  pathj = dancer[].j is time step of motion along segment
//  patht[pathi] is total time for segment pathi
//  see below for original explaination

// path? paths
// patht
//   time in beats*10
//   or starts a new base position and mode
//     -3  motion relative to the base position and base orientation for 1s and 2s
//     -4  motion relative to the base position and base orientation + pathmb for 1s and 2s
//
// pathf  forward position of the next linear piece of the path or center of the next circular piece
//        if the number is 10000+f then f is y is rounded to the nearest hotspot
//        if the number is 20000+f then f is x,y are rounded to the nearest hotspot
// paths  sideways position of the next linear piece or center of the next circular piece
// pathb  angle of the next circular piece (0 means linear piece)
//        also used with pathmt, pathwt = -1..-4 to reorient the path (see above)
//        if the number is 10000+angle the line is replaced by an arc that has an initial angle from linear and ends in the same place
// patha  angle to turn dancer in the piece (does not affect path orientation)
//        if the number is x*10000+angle, the angle is executed in the first 1/x of the segment
//        if the number is x*100000+angle, the angle is executed in the last 1/x of the segment

// default constants
initdance = "";
initview = 0; //2d
//initdance = ""; initview = "8"; //bill commented out
dsp = 80;               // dancer spacing in pixels (100 in code units)
ft = "14pt Arial";      // floor font
if (initdance != "") {
    if (initview >= 10) initview -= 10;
    else {
        dsp = 30;
        ft = "8pt Arial";
    }
}
TopDancerId = 17;        // number of dancers -1
callerx = 1100;        // caller x from upper left +x is to the right
callery = 150;          // caller y from upper left +y is down
callerc = 0x008080;     // caller color
still = 40;             // beats*10 at the start
cycle = 640;            // beats*10 in a cycle
intv = 50;              // animation interval
dw = Math.round(dsp / 2); // dancer width
dh = Math.round(dsp / 8); // dancer head radius
dt = Math.round(dsp / 8); // dancer thickness
dcm = 0x4040ff;        // man color
dcw = 0xff00ff;        // woman color
dcm0 = 0x8080ff;        // man 0 color (dancer 0)
dcw0 = 0xffc0ff;        // woman 0 color (dancer 1)
dc3 = new Array(       // 3d dancer colors

    0xff0040,           // red
    0xff8000,           // orange
    0x00a000,           // dark green
    0xf0f040,           // yellow
    0x6060ff,           // blue
    0x40f040,           // light green
    0x00a0a0,           // teal
    0x40f0f0,           // cyan
    0xa040ff,           // violet
    0xff80ff            // magenta

);
fc = 0xa06020;        // floor color
gc = 0xb07030;        // grid color
tc = 0x000000;        // floor text color
tcd = 0xffffff;        // dancer text color
ftd = "8pt Arial";      // dancer font
gd0 = 1;                // initial grid 1 yes 0 no
hresi = 1;              // half resolution time display? 0 full, 1 half
consts();

// constants
all = 2;
ones = 12;
twos = 22;
men = 0;
women = 1;
onemen = 10;
onewomen = 11;
twomen = 20;
twowomen = 21;
man = 0;
woman = 1;
improper = 0;
becket = 1;
becketccw = 2;
improperfaceacross = 3;
reverseimproper = 4;
becketdiagonal = 5;
improperwaves = 6;
properfaceacross = 7; //bill
rpd = Math.PI / 180;
r2 = Math.sqrt(2);
eol = "\n";
lblsv = new Array("Label Off", "Label Type", "Label Angle", "Label Position", "Label Couple");

var dancertoinspect = 0; //bill
var formation;
var showarms;
var dlistn;
var d3cosaxy, d3sinaxy, d3cosaz, d3sinaz, d3cosazc, d3sinazc;
d3vw = new Object();
var endopts, endoptsx, endoptsdone;
var ctx;
var cyn, cynnext, prescanx;
dlist = new Array;
ae3 = new Array;
// nms=new Array;
mtn = new Array;
p = new Array; //bb dance moves for each cycle
//bb path segment descriptors these arrays have 0..49 corrspond to dancer 0, 50..99 to dancer 1 etc
patht = new Array; //bb time step for each path segment or -3,-4 for origin & angle
pathf = new Array; //bb forward movement for each segment + info on ending formation
paths = new Array; //bb sideways movement for each sgement
patha = new Array; //bb angle info for segment (how dancer direction changes)
pathb = new Array; //bb angle info for segment (arc length and for re-angle)
pathr = new Array;
dancer = new Array; //bb each dancer has properties 
for (i = 0; i <= 19; i++) dancer[i] = new Object();
//bb    dancer[i] properties of dancer indexed by i (0,...)
// .s sex 0 M, 1 F
// .t 1 or 2 in the formation
// .c 2dim color
// .c3 3dim color
// .e boolean true if at end of formation i.e. out
// .f boolean true if have finished executing path info
// .i index to current path descriptor (patht, pathf, ...)
// .j time step of current path descriptor
// .pn last index + 1 of path descriptor
// .op original partners index
// .p 'partner' is current foursome (p=-1 means not found) found by findset(i)
// .o opposite
// .n neighbor
// .x0 .x .xc .y0 .y .yc .a0 .a .ac   (x,y)-coor and angles for origin, start of move, current
// .ar angle arms? 
// .arn something to do with arms
go = 0;
hres = hresi;
stp = false;
//bill
stponepath = false;
msgn = 0;
showarms = false;
smid = setInterval(loadmsgtext, 1000);
d3 = false;
setupa();
view(initview);

// keep cursor position
// var cursorx,cursory;
// if (window.Event) document.captureEvents(Event.MOUSEMOVE);
// document.onmousemove = getcursor;
// function getcursor(e) {
//   cursorx=(window.Event)?e.pageX:event.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);
//   cursory=(window.Event)?e.pageY:event.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);
// }

// shortcuts
sc = new Array;
sc[0] = "allemande1.5starpromenade:alleleftmiddle +all,8,540,*r2:starpromenade +all,8,*";
sc[1] = "allemande1starpromenade:alleleftmiddle +all,6,360,*r2:starpromenade +all,10,*";
sc[2] = "allemande1starpromenadeslide:alleleftmiddle +all,6,360,*r2:starpromenade +all,10,*q";
sc[3] = "allemandeleft1.5-progress:allemandeleft +all,8,540,10,*h";
sc[4] = "allemandeleft1-progress:allemandeleft +all,6,360,10,*h";
sc[5] = "allemanderight1.5-progress:allemanderight +all,8,540,-10,*h";
sc[6] = "allemanderight1-progress:allemanderight +all,6,360,10,*h";
sc[7] = "allgypsywaveswithends:gypsywaves +all,*ae";
sc[8] = "balanceandrotate:balancerotate +all,*";
sc[9] = "balanceandslideacrosstogypsyandswing:balanceslide +women,37.5,*i:balanceslide =men,137.5,*p:gypsy +all,4,360,*2:swing +all,*h";
sc[10] = "balanceandslideacrosstoswing:balanceslide +women,37.5,*i:balanceslide =men,137.5,*p:swing +all,*h";
sc[11] = "balanceandslide-progress:balanceslide +all,100,*c";
sc[12] = "balanceandslidewavystarleft:balanceslide +men,-100,*es:balanceslide =women,100,*es";
sc[13] = "balanceandslidewavystarright:balanceslide +men,100,*es:balanceslide =women,-100,*es";
sc[14] = "balanceandswing:balance +all,*:swing +all,*";
sc[15] = "balanceside:balance +all,*s";
sc[16] = "boxthegnat:twirltoswap +all,*";
sc[17] = "californiatwirl:twirltoswap +all,*cu";
sc[18] = "chain-progress:chain +all,*";
sc[19] = "chainleft:chainleft +all,*";
sc[20] = "chainright:chainright +all,*";
sc[21] = "chainstarleftprogress:chain +all,*:starleft +all,8,360,*p";
sc[22] = "chaintwirl-progress:chain +all,*w";
sc[23] = "circle.5-lol-faceacross:circleleft +all,4,180,*";
sc[24] = "circle.75-progress:circleleft +all,8,270,*";
sc[25] = "circle1-lol-faceacross:circleleft +all,8,360,*";
sc[26] = "circleallemandeprogress:circleleft +all,8,270,*:allemanderight +all,8,540,-10,*ph";
sc[27] = "circleallemandepullbyprogress:circleleft +all,8,270,*:allemanderight +all,6,360,-10,*ih:passthrough +all,*2q";
sc[28] = "circlebalancecaliforniatwirl:circleleft +all,8,270,*:balance +all,*u:twirltoswap +all,*cu";
sc[29] = "circlebalancepassthrough:circleleft +all,8,270,*:balance +all,*u:passthrough +all,*q";
sc[30] = "circlepassthrough:circleleft +all,6,270,*:passthrough +all,*2q";
sc[31] = "circlepassthroughcircle:circleleft +all,7,270,*:passthrough +all,*2q:circleright +all,7,270,*";
sc[32] = "circlepassthroughdosido:circleleft +all,6,270,*:passthrough +all,*2q:dosido +all,*";
sc[33] = "circleright.75-lol-progress:circleright +all,8,270,*";
sc[34] = "circleright.75faceacross:circleright +all,8,270,*a";
sc[35] = "circleright1-lol-faceacross:circleright +all,8,360,*";
sc[36] = "circleswing:circleleft +all,6,270,*:swing +all,*";
sc[37] = "dosido:dosido +all,*";
sc[38] = "dosidoacrosstonext:dosido +men,*l:dosido =women,*r";
sc[39] = "dosidotoawave:dosido +all,*v";
sc[40] = "downthehall:downthehall +all,*";
sc[41] = "forwardleftbackright:forwardleft +all,*r";
sc[42] = "giveandtake:giveandtake +all,*";
sc[43] = "gypsy1.5-progress:gypsy +all,8,540,*";
sc[44] = "gypsyandswing:gypsy +all,4,360,*2:swing +all,*";
sc[45] = "gypsyandswingoffcenter:gypsy +all,4,360,*2:swing +all,*h";
sc[46] = "gypsyhalfheypassright:heypassright +all,*g";
sc[47] = "gypsyheypassright:heypassright +all,*fg";
sc[48] = "gypsyleft1.5:gypsy +all,8,540,*l";
sc[49] = "gypsystar.75swing:gypsystar +all,6,270,*:swing +all,*";
sc[50] = "halfhey2passright:hey2passright +all,*";
sc[51] = "halfheypassleft-lol-progress:heypassleft +all,*";
sc[52] = "halfheypassright-lol-progress:heypassright +all,*";
sc[53] = "halfmadrobinmenforwardright:madrobin +all,*hmr";
sc[54] = "halfmadrobinwomenforwardright:madrobin +all,*hr";
sc[55] = "halfmadrobinmenforwardleft:madrobin +all,*hm";
sc[56] = "halfmadrobinwomenforwardleft:madrobin +all,*h";
sc[57] = "halfpousettemenforwardright:halfpousette +all,*mr";
sc[58] = "halfpousettewomenforwardright:halfpousette +all,*r";
sc[59] = "halfpousettemenforwardleft:halfpousette +all,*m";
sc[60] = "halfpousettewomenforwardleft:halfpousette +all,*";
sc[61] = "halfpushoffheypassleft-lol:heypassleft +all,*h";
sc[62] = "halfpushoffheypassright-lol:heypassright +all,*h";
sc[63] = "halfpushoffhey2passright-lol:heypassright +all,*i";
sc[64] = "heypassleft-lol-progress:heypassleft +all,*f";
sc[65] = "heypassright-progress:heypassright +all,*f";
sc[66] = "linesgypsylines:llgypsyll +all,*";
sc[67] = "linesgypsytake:llgypsyll +all,*b";
sc[68] = "lolbalanceandslideacrosstogypsyandswing:balanceslide +men,37.5,*i:balanceslide =women,137.5,*p:gypsy +all,4,360,*2:swing +all,*h";
sc[69] = "lolbalanceandslideacrosstoswing:balanceslide +men,37.5,*i:balanceslide =women,137.5,*p:swing +all,*h";
sc[70] = "lolcircleright.75faceacross:circleright +all,8,270,*al";
sc[71] = "lolgypsystar.75ccw:gypsystar +all,8,270,*c";
sc[72] = "lolgypsystar.75swing:gypsystar +all,6,270,*m:swing +all,*";
sc[73] = "lolpassthroughallemandetowave:passthrough +all,*ul3:allemanderight +all,4,270,25,*w7";
sc[74] = "longlines-lol:longlines +all,*";
sc[75] = "longlinesfaceupdown-lol:longlines +all,*u";
sc[76] = "longlinesmenroll-lol:longlines +all,*m";
sc[77] = "longlinesmenrollwithends-lol:longlines +all,*mo";
sc[78] = "longlineswithends:longlines +all,*o";
sc[79] = "longlineswomenroll-lol:longlines +all,*w";
sc[80] = "longlineswomenrollmenchainleft:longlines +all,*wq:chainleft +all,*q";
sc[81] = "longlineswomenrollwithends:longlines +all,*wo";
sc[82] = "madrobinmenforwardright:madrobin +all,*mr";
sc[83] = "madrobinwomenforwardright:madrobin +all,*r";
sc[84] = "madrobinmenforwardleft:madrobin +all,*m";
sc[85] = "madrobinwomenforwardleft:madrobin +all,*";
sc[86] = "menallemandeleft1.5:alleleftmiddle +all,8,540,*4";
sc[87] = "menallemandeleft1.5spin:alleleftmiddle +all,8,540,*o4";
sc[88] = "menallemanderight1.5:allerightmiddle +all,8,540,*m4";
sc[89] = "menallemanderight1.5spin:allerightmiddle +all,8,540,*mo4";
sc[90] = "menallemandeswing:alleleftmiddle +all,8,540,*3:swing +all,*";
sc[91] = "mencrossswing:step +men,0,2,75,2,0,*:step =women,0,2,-25,-2,0,*:swing +all,*h";
sc[92] = "mengypsywaveswithends:gypsywaves +all,*me";
sc[93] = "menhalfmadrobin:madrobin +all,*hm";
sc[94] = "menhalfmadrobinleft:madrobin +all,*hmr";
sc[95] = "menmadrobin:madrobin +all,*m";
sc[96] = "menrollleftwithends:rollaway +all,*me";
sc[97] = "orbit:orbit +all,*";
sc[98] = "orbitrtr:orbit +all,*r";
sc[99] = "passthroughacross-lol-progress:passthrough +all,*";
sc[100] = "passthroughallemandetowave:passthrough +all,*u3:allemanderight +all,4,270,-25,*w7";
sc[101] = "passthroughcirclepassthrough:passthrough +all,*i:circleleft +all,8,360,*l:passthrough +all,*q";
sc[102] = "passthroughupdownprogress-lol:passthrough +all,*q";
sc[103] = "petronella-lol-progress:petronella +all,*";
sc[104] = "promenade:promenade +all,*";
sc[105] = "promenadetonext:promenade +all,*q";
sc[106] = "pushoffheypassleft:heypassleft +all,*fh";
sc[107] = "pushoffheypassright-progress:heypassright +all,*hf";
sc[108] = "rightandleftthrough-lol-progress:rightandleftthrough +all,*";
sc[109] = "rightandleftthroughchainprogress:rightandleftthrough +all,*:chain +all,*pw";
sc[110] = "rightandleftthroughtwirl-progress:rightandleftthrough +all,*w";
sc[111] = "rolltowhirlhold:rollaway +all,*2ms";
sc[112] = "slidecircle:step +all,0,2,0,-100,0,*:circleleft +all,6,270,*";
sc[113] = "starleft.75-lol-progress:starleft +all,8,270,*";
sc[114] = "starleft.875-progress:starleft +all,8,315,*";
sc[115] = "starleft1.25progress:starleft +all,10,450,*p";
sc[116] = "starleft1-lol-progress:starleft +all,8,360,*";
sc[117] = "starleftallemandeprogression:starleft +all,8,315,*hl:allemanderight +women,4,270,0,*a:step =men,0,4,50,0,-360,*q";
sc[118] = "starlefttowavystar:starleft +all,8,315,*v";
sc[119] = "starright.75-lol-progress:starright +all,8,270,*";
sc[120] = "starright.75towaveacross:starright +all,8,270,*w";
sc[121] = "starright1-lol-progress:starright +all,8,360,*";
sc[122] = "starrightallemandeprogression:starright +all,8,315,*hl:allemandeleft +men,4,270,0,*a:step =women,0,4,50,0,-360,*q";
sc[123] = "starrightallemandeprogression2:starright +women,4,225,*h:step =men,0,1,-40,0,0,*:step =men,1,2,90,-10,0,*:step +all,0,4,0,50,-180,*t:allemandeleft +men,4,270,0,*a:step =women,0,4,50,0,-360,*q";
sc[124] = "swing:swing +all,*";
sc[125] = "swingoffcenter:swing +all,*h";
sc[126] = "whirlstarpromenade:step +men,0,4,0,20,270,*t:step =women,0,4,0,-20,270,*t:starpromenade +all,10,*";
sc[127] = "whirlstarpromenadeslide:step +men,0,4,0,20,270,*t:step =women,0,4,0,-20,270,*t:starpromenade +all,10,*q";
sc[128] = "womenallemandeleft1.5:alleleftmiddle +all,8,540,*l4";
sc[129] = "womenallemandeleft1:alleleftmiddle +all,4,360,*l";
sc[130] = "womenallemanderight1.5:allerightmiddle +all,8,540,*4";
sc[131] = "womenallemanderight1.5spin:allerightmiddle +all,8,540,*o4";
sc[132] = "womencrossswing:step +men,0,2,-25,2,0,*:step =women,0,2,75,-2,0,*:swing +all,*h";
sc[133] = "womendosido:allerightmiddle +all,8,360,*d4";
sc[134] = "womengiveandtake:giveandtake +all,*w";
sc[135] = "womenrollleftwithends:rollaway +all,*e";
sc[136] = "journey:circleleft +all,7,270,*a:step2 +men,0,3,100,0,90,-30,*:step2 =women,0,3,100,0,-90,-30,*:step2 +men,0,3,100,0,90,30,*:step2 =women,0,3,100,0,-90,30,*:passthrough +all,*ul56";
sc[137] = "whim:circleleft +all,7,270,*u:step2 +men,0,3,100,0,-90,-30,*:step2 =women,0,3,100,0,90,-30,*:step2 +men,0,3,100,0,-90,30,*:step2 =women,0,3,100,0,90,30,*:passthrough +all,*q6";
sc[138] = "givetakeadjust:step + men, 0, 2, 35, 25, 0:step = women, 0, 2, 35, -25, 0:step + men, 0, 2, 35, 25, 0:step = women, 0, 2, -35, -25, 0";


// transitions
// bill used by assumedoptions() for transitions from current figure to next figure
// - means new option (newopt) is added
// or current option is replaced by new option
ao = new Array;
ao[0] = "curfig,curopt,        ,nextfig,            ,newopt,";
ao[1] = "heypassleft,-,        ,alleleftmiddle,     ,a3 ,";
ao[2] = "starleft,-,           ,alleleftmiddle,     ,m3 ,";
ao[3] = "circleright,p,        ,allemandeleft,      ,pw ,";
ao[4] = "heypassright,-,       ,allemandeleft,      ,u  ,";
ao[5] = "starleft,-,           ,allemandeleft,      ,u  ,";
ao[6] = "heypassleft,-,        ,allemanderight,     ,u  ,";
ao[7] = "heypassright,-,       ,allerightmiddle,    ,a3 ,";
ao[8] = "starright,-,          ,allerightmiddle,    ,m3 ,";
ao[9] = "heypassleft,p,        ,balance,            ,p  ,";
ao[10] = "heypassleft,h,        ,balance,            ,hu ,";
ao[11] = "heypassleft,-,        ,balance,            ,b  ,";
ao[12] = "heypassright,p,       ,balance,            ,p  ,";
ao[13] = "heypassright,h,       ,balance,            ,hu ,";
ao[14] = "heypassright,i,       ,balance,            ,iu ,";
ao[15] = "heypassright,-,       ,balance,            ,b  ,";
ao[16] = "passthrough,p,        ,balance,            ,p  ,";
ao[17] = "passthrough,q,        ,balance,            ,q  ,";
ao[18] = "passthrough,-,        ,balance,            ,u  ,";
ao[19] = "petronella,p,         ,balance,            ,p  ,";
ao[20] = "petronella,-,         ,balance,            ,u  ,";
ao[21] = "heypassleft,-,        ,balancerotate,      ,v  ,";
ao[22] = "heypassright,-,       ,balancerotate,      ,v  ,";
ao[23] = "petronella,-,         ,balancerotate,      ,v  ,";
ao[24] = "starright,-,          ,balancerotate,      ,v  ,";
ao[25] = "circleleft,-,         ,balanceslide,       ,v  ,";
ao[26] = "heypassleft,-,        ,balanceslide,       ,v  ,";
ao[27] = "heypassright,-,       ,balanceslide,       ,v  ,";
ao[28] = "petronella,-,         ,balanceslide,       ,v  ,";
ao[29] = "starright,w,          ,balanceslide,       ,w  ,";
ao[30] = "starright,-,          ,balanceslide,       ,v  ,";
ao[31] = "allemandeleft,-,      ,chain,              ,ao3,";
ao[32] = "circleleft,-,         ,chain,              ,a3 ,";
ao[33] = "circleright,-,        ,chain,              ,a3 ,";
ao[34] = "heypassleft,-,        ,chain,              ,a3 ,";
ao[35] = "heypassright,-,       ,chain,              ,a3 ,";
ao[36] = "starright,-,          ,chain,              ,c3 ,";
ao[37] = "chain,-,              ,chainleft,          ,d  ,";
ao[38] = "circleleft,-,         ,chainleft,          ,d  ,";
ao[39] = "circleright,-,        ,chainleft,          ,d  ,";
ao[40] = "longlines,-,          ,chainleft,          ,d  ,";
ao[41] = "promenade,-,          ,chainleft,          ,d  ,";
ao[42] = "rightandleftthrough,-,,chainleft,          ,d  ,";
ao[43] = "starright,-,          ,chainleft,          ,d  ,";
ao[44] = "swing,-,              ,chainleft,          ,d  ,";
ao[45] = "chain,-,              ,chainright,         ,e  ,";
ao[46] = "chainleft,-,          ,chainright,         ,e  ,";
ao[47] = "circleleft,-,         ,chainright,         ,e  ,";
ao[48] = "circleright,-,        ,chainright,         ,e  ,";
ao[49] = "promenade,-,          ,chainright,         ,e  ,";
ao[50] = "rightandleftthrough,-,,chainright,         ,e  ,";
ao[51] = "starleft,-,           ,chainright,         ,e  ,";
ao[52] = "chain,-,              ,forwardleft,        ,d  ,";
ao[53] = "circleleft,-,         ,forwardleft,        ,d  ,";
ao[54] = "circleright,-,        ,forwardleft,        ,d  ,";
ao[55] = "longlines,-,          ,forwardleft,        ,d  ,";
ao[56] = "promenade,-,          ,forwardleft,        ,d  ,";
ao[57] = "rightandleftthrough,-,,forwardleft,        ,d  ,";
ao[58] = "starright,-,          ,forwardleft,        ,d  ,";
ao[59] = "swing,-,              ,forwardleft,        ,d  ,";
ao[60] = "chain,-,              ,forwardright,       ,e  ,";
ao[61] = "chainleft,-,          ,forwardright,       ,e  ,";
ao[62] = "circleleft,-,         ,forwardright,       ,e  ,";
ao[63] = "circleright,-,        ,forwardright,       ,e  ,";
ao[64] = "promenade,-,          ,forwardright,       ,e  ,";
ao[65] = "rightandleftthrough,-,,forwardright,       ,e  ,";
ao[66] = "starleft,-,           ,forwardright,       ,e  ,";
ao[67] = "swing,-,              ,giveandtake,        ,4  ,";
ao[68] = "balancerotate,-,      ,gypsy,              ,u  ,";
ao[69] = "starleft,p,           ,gypsy,              ,p  ,";
ao[70] = "starleft,-,           ,gypsy,              ,g  ,";
ao[71] = "heypassleft,-,        ,gypsy,              ,b  ,";
ao[72] = "starleft,-,           ,gypsystar,          ,z  ,";
ao[73] = "circleleft,-,         ,heypassleft,        ,a  ,";
ao[74] = "circleleft,-,         ,longlines,          ,a  ,";
ao[75] = "circleright,-,        ,heypassright,       ,a  ,";
ao[76] = "gypsy,l,              ,heypassright,       ,al3,";
ao[77] = "circleright,-,        ,longlines,          ,a  ,";
ao[78] = "chainright,-,         ,longlines,          ,x  ,";
ao[79] = "heypassleft,-,        ,halfpousette,       ,a  ,";
ao[80] = "heypassleft,-,        ,madrobin,           ,a  ,";
ao[81] = "heypassright,-,       ,halfpousette,       ,a  ,";
ao[82] = "heypassright,-,       ,madrobin,           ,a  ,";
ao[83] = "starright,-,          ,passthrough,        ,u  ,";
ao[84] = "circleleft,-,         ,promenade,          ,a3 ,";
ao[85] = "circleright,-,        ,promenade,          ,a3 ,";
ao[86] = "circleleft,-,         ,rightandleftthrough,,a3 ,";
ao[87] = "circleright,-,        ,rightandleftthrough,,a3 ,";
ao[88] = "balanceslide,-,       ,starleft,           ,c  ,";
ao[89] = "chain,-,              ,starleft,           ,s4 ,";
ao[90] = "chainleft,-,          ,starleft,           ,s4 ,";
ao[91] = "chainright,-,         ,starleft,           ,s4 ,";
ao[92] = "circleleft,-,         ,starleft,           ,s4 ,";
ao[93] = "heypassleft,p,        ,starleft,           ,n  ,";
ao[94] = "heypassleft,-,        ,starleft,           ,s4 ,";
ao[95] = "longlines,-,          ,starleft,           ,s4 ,";
ao[96] = "passthrough,p,        ,starleft,           ,p  ,";
ao[97] = "passthrough,q,        ,starleft,           ,q  ,";
ao[98] = "passthrough,-,        ,starleft,           ,s4 ,";
ao[99] = "petronella,-,         ,starleft,           ,s  ,";
ao[100] = "promenade,-,          ,starleft,           ,s4 ,";
ao[101] = "rightandleftthrough,-,,starleft,           ,s4 ,";
ao[102] = "starright,p,          ,starleft,           ,n  ,";
ao[103] = "starright,-,          ,starleft,           ,s4 ,";
ao[104] = "chain,-,              ,starright,          ,r4 ,";
ao[105] = "chainleft,-,          ,starright,          ,r4 ,";
ao[106] = "chainright,-,         ,starright,          ,r4 ,";
ao[107] = "circleright,p,        ,starright,          ,t  ,";
ao[108] = "circleright,-,        ,starright,          ,r4 ,";
ao[109] = "heypassright,p,       ,starright,          ,t  ,";
ao[110] = "heypassright,-,       ,starright,          ,r4 ,";
ao[111] = "longlines,-,          ,starright,          ,r4 ,";
ao[112] = "passthrough,p,        ,starright,          ,p  ,";
ao[113] = "passthrough,q,        ,starright,          ,q  ,";
ao[114] = "passthrough,-,        ,starright,          ,r4 ,";
ao[115] = "petronella,p,         ,starright,          ,t  ,";
ao[116] = "promenade,-,          ,starright,          ,r4 ,";
ao[117] = "rightandleftthrough,-,,starright,          ,r4 ,";
ao[118] = "starleft,p,           ,starright,          ,t  ,";
ao[119] = "starleft,-,           ,starright,          ,r4 ,";
ao[120] = "starpromenade,-,      ,starright,          ,r4 ,";
ao[121] = "twirltoswap,-,        ,starright,          ,r4 ,";
ao[122] = "balancerotate,-,      ,swing,              ,u  ,";
ao[123] = "heypassleft,p,        ,swing,              ,p  ,";
ao[124] = "heypassleft,-,        ,swing,              ,u3 ,";
ao[125] = "heypassright,p,       ,swing,              ,p  ,";
ao[126] = "heypassright,-,       ,swing,              ,u3 ,";
ao[127] = "passthrough,p,        ,swing,              ,p  ,";
ao[128] = "passthrough,q,        ,swing,              ,q  ,";
ao[129] = "passthrough,-,        ,swing,              ,u3 ,";
ao[130] = "petronella,p,         ,swing,              ,p  ,";
ao[131] = "petronella,-,         ,swing,              ,u  ,";
ao[132] = "starright,-,          ,swing,              ,u  ,";
ao[133] = "swing,-,              ,starleft,           ,s4 ,";
ao[134] = "swing,-,              ,starright,          ,r4 ,";
ao[135] = "swing,-,              ,downthehall,        ,y  ,";
ao[136] = "swing,h,              ,-,                  ,h  ,";
ao[137] = "-,p,                  ,-,                  ,p  ,";
ao[138] = "-,-,                  ,alleleftmiddle,     ,3  ,";
ao[139] = "-,-,                  ,allerightmiddle,    ,3  ,";
ao[140] = "-,-,                  ,chain,              ,3  ,";
ao[141] = "-,-,                  ,heypassleft,        ,3  ,";
ao[142] = "-,-,                  ,heypassright,       ,3  ,";
ao[143] = "-,-,                  ,passthrough,        ,3  ,";
ao[144] = "-,-,                  ,promenade,          ,3  ,";
ao[145] = "-,-,                  ,rightandleftthrough,,3  ,";
ao[146] = "-,-,                  ,starleft,           ,4  ,";
ao[147] = "-,-,                  ,starright,          ,4  ,";

// menus
var menut, menun, menuc, menum, menus, menuv, menuw;
menub = undefined; // current menu with - button
menun = undefined; // current menu base
menue = true;      // menu over/out
menut = 0;         // menu timeout
menua = 0;         // menu autoopen timeout
menuc = 0;         // menu current window
menum = 0;         // menu max
menus = 15;        // menu window size
menuv = 0;         // menu vertical position
menuw = 0;         // menu width in px
mopenev = 0;

function adddropdown(b) {
    var i;
    document.write('<li class="menu1"><input type="button" id="m' + b[0] + '" class="menu1" onclick="mopen()" value="' + b[0] + '">');
    document.write('<div class="menu2" id="m' + b[0] + '-d" >');
    for (i = 0; b[i * 2 + 2] != undefined; i++) {
        if (b[i * 2 + 4] == undefined) document.write('<input type="button" id="m' + b[0] + '-' + i + '" class="menu2" style="border-bottom-width:1px; display:none" onclick="' + b[i * 2 + 2] + '" value="' + b[i * 2 + 1] + '">');
        else document.write('<input type="button" id="m' + b[0] + '-' + i + '" class="menu2" style="display:none" onclick="' + b[i * 2 + 2] + '" value="' + b[i * 2 + 1] + '">');
    }
    document.write('</div></li>');
    document.getElementById("m" + b[0]).onmouseover = mprep;
    document.getElementById("m" + b[0]).onmouseout = mcloseslow;
    document.getElementById("m" + b[0]).onmouseenter = mprep;
    document.getElementById("m" + b[0]).onmouseleave = mcloseslow;
    for (i = 0; b[i * 2 + 2] != undefined; i++) {
        document.getElementById("m" + b[0] + "-" + i).onmouseover = mbut;
        document.getElementById("m" + b[0] + "-" + i).onmouseout = mcloseslow;
        document.getElementById("m" + b[0] + "-" + i).onmouseenter = mbut;
        document.getElementById("m" + b[0] + "-" + i).onmouseleave = mcloseslow;
    }
}

function setmenuval(n, v, b, e) {
    var j, m;
    if (b == undefined) b = 0;
    if (e == undefined) e = 1000;
    for (j = b; j <= e; j++) {
        m = document.getElementById("m" + n + "-" + j);
        if (m == undefined) break;
        if (m.value.substr(m.value.length - 1, 1) == " ") m.value = m.value.substr(0, m.value.length - 1);
        if ((m.value == v) || (j == v)) {
            m.value = m.value + " ";
            m.style.color = "#000";
        }
        else m.style.color = "#fff";
    }
}

function mbut(e) {
    var a, i, j, m, r, mn, ev;

    if (!e) ev = window.event; else ev = e;
    mn = ev.target.id;
    if (xor(menue, ev.type == "mouseover")) return;

    mcleartimeout();
    menub = mn;

    // reset menuc - current window
    a = mn.split("-");
    if ((a[1] != undefined) && (menum > (menus - 1))) {
        j = menuc;
        while (a[1] <= (j + 1)) {
            j--;
            if (j < 0) {
                j = 0;
                break;
            }
        }
        while (a[1] >= (j + menus - 2)) {
            j++;
            if ((j + menus - 1) > menum) {
                j = menum - menus + 1;
                break;
            }
        }
        menuc = j;
    }

    for (i = 0; i <= menum; i++) {
        m = document.getElementById(menun + "-" + i);
        if ((i >= menuc) && (i <= (menuc + menus - 1))) {
            m.style.height = "auto";
            if (m.value.substr(m.value.length - 1, 1) == " ") m.style.color = "#000"; else m.style.color = "#fff";
        }
        else {
            m.style.height = "2px";
            m.style.color = "#aaa";
        }
        if ((a[1] == undefined) || (a[1] != i)) m.style.background = "#aaa"; else m.style.background = "#ccc";
        m.style.display = "block";
        m.style.top = menuv + "px";
        m.style.width = menuw + "px";
    }
}

function mprep(e) {
    var mn, ev;

    if (!e) ev = window.event; else ev = e;
    mn = ev.target.id;
    if (ev.type == "mouseenter") {
        mcleartimeout();
        mclose();
        menue = false;
    }
    if (xor(menue, ev.type == "mouseover")) return;

    mopenev = ev;

    menua = window.setTimeout("mopen()", 500);

}

function mopen() {
    var i, j, k, l, m, mn, ev, n, p;

    ev = mopenev;
    mn = ev.target.id;
    if (xor(menue, ev.type == "mouseover")) return;

    mcleartimeout();
    mclose();
    menun = mn;
    menub = mn;
    menuc = 0;
    menuv = 0;

    // set menuw - width, menum - top item
    l = 0;
    for (i = 0; i >= 0; i++) {
        m = document.getElementById(menun + "-" + i);
        if (m == undefined) break;
        menum = i;
        k = m.value.length;
        if (k > l) {
            l = k;
            j = i;
        }
    }
    m = document.getElementById(menun + "-" + j);
    if (m.value.substr(m.value.length - 1, 1) != " ") {
        p = 0;
        m.value = m.value + " ";
    } else p = 1;
    m.style.width = "auto";
    m.style.display = "block";
    menuw = m.clientWidth;
    n = document.getElementById(menun);
    if (n.clientWidth > menuw) menuw = n.clientWidth;
    menuw += 2;
    if (p == 0) m.value = m.value.substr(0, m.value.length - 1);

    // set menuv
    mbut(ev);
    // i= height of last item
    j = document.getElementById(menun + "-0").style.height;
    document.getElementById(menun + "-0").style.height = document.getElementById(menun + "-" + menum).style.height;
    i = elementy(document.getElementById(menun + "-1")) - elementy(document.getElementById(menun + "-0"));
    document.getElementById(menun + "-0").style.height = j;
    if ((elementy(document.getElementById(menun + "-" + menum)) + i) > (window.innerHeight + windowy() - 30)) {
        menuv = window.innerHeight + windowy() - 30 - elementy(document.getElementById(menun + "-" + menum)) - i;
        mbut(ev);
    }
    if (elementy(document.getElementById(menun + "-0")) <= windowy() + 2) {
        menuv += windowy() + 2 - elementy(document.getElementById(menun + "-0"));
        mbut(ev);
    }
}

function mclose() {
    var i;
    if (menun != undefined) {
        for (i = 0; i <= menum; i++) document.getElementById(menun + "-" + i).style.display = "none";
        menun = undefined;
    }
}

function mcloseslow(e) {
    var mn, ev;
    if (!e) ev = window.event; else ev = e;
    mn = ev.target.id;
    if (xor(menue, ev.type == "mouseout")) return;
    mcleartimeout();
    menut = window.setTimeout("mclose()", 250);
}

function mcleartimeout() {
    if (menua != 0) window.clearTimeout(menua);
    menua = 0;
    if (menut != 0) window.clearTimeout(menut);
    menut = 0;
}

function windowy() {
    var y;
    y = document.body.scrollTop;
    if (y == 0) {
        if (window.pageYOffset) y = window.pageYOffset;
        else y = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
    }
    return y;
}

function elementy(el) {
    var y;
    y = 0;
    if (el.offsetParent) {
        while (true) {
            y += el.offsetTop;
            if (!el.offsetParent) break;
            el = el.offsetParent;
        }
    }
    else if (el.y) y += el.y;
    return y;
}

function setupa() {
    var b, c, i, j;

    c = document.cookie.split(";");

    for (i = 0; a[i] != undefined; i++) j = i;

    if (c != "") {
        for (i = 0; i < c.length; i++) {
            b = c[i].substr(0, c[i].indexOf("="));
            while (b.substr(0, 1) == " ") b = b.substr(1);
            if ((b != "") && (b != "Empty") && (b != "currentdance") && (b != "currenttext")) {
                j++;
                a[j] = "|" + b + " - ";
            }
        }
    }

    for (i = 1; i <= 5; i++) {
        j++;
        a[j] = "~Empty - ";
    }

    a.sort(namesort);
}

function resetupa() {
    var b, c, i, j, k;

    c = document.cookie.split(";");

    j = -1;
    for (i = 0; a[i] != undefined; i++) {
        k = i;
        if (a[i].substr(0, 1) == '|') a[i] = "~Empty - ";
        if ((a[i].substr(0, 1) == '~') && (j == -1)) j = i - 1;
    }

    if (c != "") {
        for (i = 0; (i < c.length) && (j <= k); i++) {
            b = c[i].substr(0, c[i].indexOf("="));
            while (b.substr(0, 1) == " ") b = b.substr(1);
            if ((b != "") && (b != "Empty") && (b != "currentdance") && (b != "currenttext")) {
                j++;
                a[j] = "|" + b + " - ";
            }
        }
    }

    a.sort(namesort);
}

function setupsc() {
    var i, n;
    for (n = 0; sc[n] != undefined; n++);
    for (i = 0; sc[i] != undefined; i++) {
        if (sc[i].indexOf("-lol") >= 0) {
            sc[i] = sc[i].replace("-lol", "");
            sc[n++] = "lol" + sc[i] + "l";
        }
        if (sc[i].indexOf("-progress") >= 0) {
            sc[n++] = sc[i].replace("-progress", "progress") + "p";
            sc[i] = sc[i].replace("-progress", "");
        }
        if (sc[i].indexOf("-faceacross") >= 0) {
            sc[n++] = sc[i].replace("-faceacross", "faceacross") + "a";
            sc[i] = sc[i].replace("-faceacross", "");
        }
    }
}

function getpos(f) {
    var i, re, rc, r, nl;
    if (f.selectionStart || (f.selectionStart == "0")) return f.selectionStart;
    else if (document.selection) { // IE
        eol = "\r\n";
        f.focus();
        r = document.selection.createRange();
        if (r == null) return 0;
        re = f.createTextRange(),
            rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint("EndToStart", re);
        nl = 0;
        for (i = 0; i < rc.text.length; i++) if (rc.text.substr(i, 1) == "\n") nl += 2;
        return rc.text.length + nl;
    }
    return 0;
}

function torgb(x) {
    var a;
    a = x.toString(16);
    while (a.length < 6) a = "0" + a;
    return "#" + a;
}

function reset() {
    setcookie("currentdance", "", 365);
    setcookie("currenttext", "", 365);
    window.location.reload();
}

function addfiguremenu(n) {
    var i, j, s, b, c;

    b = new Array;
    c = new Array;
    b[0] = n;
    n = n.toLowerCase();

    j = 1;
    for (i = 0; sc[i] != undefined; i++) {
        s = sc[i].substr(0, sc[i].indexOf(":"));
        if ((n == "all") || (s.indexOf(n) >= 0)) b[j++] = s;
    }
    b.sort();

    c[0] = b[0] + '...';
    for (i = 1; b[i] != undefined; i++) {
        c[i * 2 - 1] = b[i];
        c[i * 2] = 'figselect(&#34;' + b[i] + '&#34;)';
    }

    adddropdown(c);
}

function figselect(a) {
    var t, i;
    t = document.getElementById("dancetext").value;
    i = getpos(document.danceform.dancetext);
    if ((i != 0) && (t.substr(i - 1, 1) != "\n")) a = eol + a;
    if (t.substr(i, eol.length) != eol) a = a + eol;
    t = t.substr(0, i) + a + t.substr(i);
    document.getElementById("dancetext").value = t;
}

function namesort(a, b) {
    var a2, b2;
    a2 = a.toLowerCase();
    if (a2.substr(0, 4) == "the ") a2 = a2.substr(4);
    b2 = b.toLowerCase();
    if (b2.substr(0, 4) == "the ") b2 = b2.substr(4);
    if (a2 > b2) return 1;
    else if (a2 < b2) return -1;
    else return 0;
}

function adddancedropdown(n, m, o, p) {
    var d, i, j;
    d = new Array();
    if (n != "|") {
        d[0] = n + "..." + m + (p ? "" : " ");
        j = 0;
        for (i = 0; a[i] != undefined; i++) {
            if ((namesort(a[i], n) > 0) && (namesort(a[i], o) < 0)) {
                j++;
                d[j] = a[i].substr(0, a[i].indexOf(" - "));
                j++;
                d[j] = (p ? "dlistn=-1; " : "") + "loadin(" + i + "," + (p ? "true" : "false") + ");";
            }
        }
    }
    else {
        d[0] = "User" + (p ? "" : " ");
        j = 0;
        for (i = 0; a[i] != undefined; i++) {
            if ((a[i].substr(0, 1) == "|") || (a[i].substr(0, 1) == "~")) {
                j++;
                d[j] = a[i].substr(0, a[i].indexOf(" - "));
                d[j] = d[j].substr(1);
                j++;
                d[j] = (p ? "dlistn=-1; " : "") + "loadex(" + i + "," + (p ? "true" : "false") + ");";
            }
        }
    }
    adddropdown(d);
}

function moddancedropdown() {
    var d, i, j;
    resetupa();
    for (i = 0; true; i++) {
        m = document.getElementById("mUser-" + i);
        if (m == undefined) break;
        m.value = "Empty";
        m = document.getElementById("mUser -" + i);
        m.value = "Empty";
    }
    j = 0;
    for (i = 0; a[i] != undefined; i++) {
        if (a[i].substr(0, 1) == "|") {
            d = a[i].substr(0, a[i].indexOf(" - "));
            d = d.substr(1);
            m = document.getElementById("mUser-" + j);
            if (m == undefined) break;
            m.value = d;
            m = document.getElementById("mUser -" + j);
            j++;
            m.value = d;
        }
    }
}

function setcookie(c_name, value, exdays) {
    var exdate;
    exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getcookie(c_name) {
    var i, x, y, c;
    c = document.cookie.split(";");
    for (i = 0; i < c.length; i++) {
        x = c[i].substr(0, c[i].indexOf("="));
        y = c[i].substr(c[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) return unescape(y);
    }
    return "";
}

function odset(i, q1, q2) {
    var o, j;
    o = true;
    if ((q2 <= 1) && ((q1 == 0) || (q1 == 3)) && (dancer[i].x >= -400)) {
        o = false;
        for (j = 0; j <= topdancer; j++) if (dancer[j].x > (dancer[i].x + 10)) o = true;
    }
    if ((q2 <= 1) && ((q1 == 1) || (q1 == 2)) && (dancer[i].x >= -400)) {
        o = false;
        for (j = 0; j <= topdancer; j++) if (dancer[j].x > (dancer[i].x + 110)) o = true;
    }
    if ((q2 >= 2) && ((q1 == 1) || (q1 == 2)) && (dancer[i].x < -400)) {
        o = false;
        for (j = 0; j <= topdancer; j++) if (dancer[j].x < (dancer[i].x - 10)) o = true;
    }
    if ((q2 >= 2) && ((q1 == 0) || (q1 == 3)) && (dancer[i].x < -400)) {
        o = false;
        for (j = 0; j <= topdancer; j++) if (dancer[j].x < (dancer[i].x - 110)) o = true;
    }
    return o;
}
function oeset(i, q1, q2) {
    var o, j;
    o = true;
    if ((q2 >= 2) && ((q1 == 0) || (q1 == 3)) && (dancer[i].x >= -400)) {
        o = false;
        for (j = 0; j <= topdancer; j++) if (dancer[j].x > (dancer[i].x + 10)) o = true;
    }
    if ((q2 >= 2) && ((q1 == 1) || (q1 == 2)) && (dancer[i].x >= -400)) {
        o = false;
        for (j = 0; j <= topdancer; j++) if (dancer[j].x > (dancer[i].x + 110)) o = true;
    }
    if ((q2 <= 1) && ((q1 == 1) || (q1 == 2)) && (dancer[i].x < -400)) {
        o = false;
        for (j = 0; j <= topdancer; j++) if (dancer[j].x < (dancer[i].x - 10)) o = true;
    }
    if ((q2 <= 1) && ((q1 == 0) || (q1 == 3)) && (dancer[i].x < -400)) {
        o = false;
        for (j = 0; j <= topdancer; j++) if (dancer[j].x < (dancer[i].x - 110)) o = true;
    }
    return o;
}

function enddancers() {
    // a.wll - woman lower left
    // a.wur - woman upper right
    // a.wsll - woman second lower left
    // a.wsur - woman second upper right
    // a.dll - dancer lower left
    // a.dur - dancer lower left
    var i, f, a;
    a = new Object();

    f = 1000;
    for (i = 0; i <= topdancer; i++) {
        if ((dancer[i].s == woman) && (dancer[i].y >= 0) && (dancer[i].x < f)) {
            a.wll = i;
            f = dancer[i].x;
        }
    }
    f = 1000;
    for (i = 0; i <= topdancer; i++) {
        if ((dancer[i].s == woman) && (dancer[i].y >= 0) && (dancer[i].x < f) && (i != a.wll)) {
            a.wsll = i;
            f = dancer[i].x;
        }
    }
    f = -2000;
    for (i = 0; i <= topdancer; i++) {
        if ((dancer[i].s == woman) && (dancer[i].y < 0) && (dancer[i].x > f)) {
            a.wur = i;
            f = dancer[i].x;
        }
    }
    f = -2000;
    for (i = 0; i <= topdancer; i++) {
        if ((dancer[i].s == woman) && (dancer[i].y < 0) && (dancer[i].x > f) && (i != a.wur)) {
            a.wsur = i;
            f = dancer[i].x;
        }
    }

    f = 1000;
    for (i = 0; i <= topdancer; i++) {
        if ((dancer[i].y >= 0) && (dancer[i].x < f)) {
            a.dll = i;
            f = dancer[i].x;
        }
    }
    f = -2000;
    for (i = 0; i <= topdancer; i++) {
        if ((dancer[i].y < 0) && (dancer[i].x > f)) {
            a.dur = i;
            f = dancer[i].x;
        }
    }

    return a;
}

function trail(j) {
    var i;
    tn = j;
    // to show trail of inspected dancer
    if (j == 2) {
        tn = dancertoinspect;
    }

    tr = 0;
    ts = 0;
    drawfloor();
    for (i = 0; i <= topdancer; i++) drawdancer(i, dancer[i].xc, dancer[i].yc, dancer[i].ac, dancer[i].ar);
    finish3d();
    drawtitle();
    if (j >= 0) setmenuval("Trail", j); else setmenuval("Trail", 3);
}
function topd(i) {
    TopDancerId = i;
    setmenuval("Dancers", i + 1);
}
function lbls(j) {
    var i;
    lb = j;
    if (go == 0) {
        drawfloor();
        for (i = 0; i <= topdancer; i++) drawdancer(i, dancer[i].xc, dancer[i].yc, dancer[i].ac, dancer[i].ar);
        finish3d();
        drawtitle();
    }
    setmenuval("Debug", lblsv[j], 2, 6);
}
function view(i) {
    d3 = true;
    yofs = dsp * 4;
    ytofs = Math.round(dsp * 4.5);
    if (i == 0) d3 = false;
    else if (i == 1) {
        d3x = 0;
        d3y = 0;
        d3axy = 15;
        d3az = 15;
        d3r = 1000;
        yofs = dsp * 5;
    }
    else if (i == 2) {
        d3x = 0;
        d3y = 0;
        d3axy = 15;
        d3az = 45;
        d3r = 1000;
        yofs = Math.round(dsp * 4.125);
    }
    else {
        d3x = 0;
        d3y = 0;
        d3axy = 15;
        d3az = 60;
        d3r = 1000;
        yofs = Math.round(dsp * 3.875);
    }
    d3reset = true;
    setmenuval("View", i);
}
function pause(i) {
    stp = false;
    stponepath = false;
    //        if (i == 1) { go = 2; siid = setInterval(drawall, intv); }
    // changed as with above code, if go button pressed twice, can never stop
    if (i == 1) {
        if (go != 2) {
            go = 2;
            siid = setInterval(drawall, intv);
        }
    }
    else if (go == 2) go = 1;
}
function setshowarms(a) {
    showarms = a;
    if (a == 1) setmenuval("Speed", "Arms", 5, 6); else setmenuval("Speed", "No Arms", 5, 6);
}
function speed(i) {
    intv = i;
    if (siid != 0) {
        clearInterval(siid);
        siid = setInterval(drawall, intv);
    }
    if (i == 25) setmenuval("Speed", 0, 0, 4);
    else if (i == 38) setmenuval("Speed", 1, 0, 4);
    else if (i == 50) setmenuval("Speed", 2, 0, 4);
    else if (i == 75) setmenuval("Speed", 3, 0, 4);
    else setmenuval("Speed", 4, 0, 4);
}
function onestep(nb) {
    if (go == 0) {
        numbeatperstep = nb;
        stp = true;
        go = 2;
        siid = setInterval(drawall, intv);
    }
}
function onepathstep() {
    if (go == 0) {
        stponepath = true;
        go = 2;
        siid = setInterval(drawall, intv);
    }
}
function presc(i) {
    prescan = i;
    setmenuval("Debug", 1 - i, 0, 1);
}
function debug() {
    //        var i, j;
    //             i=dancertoinspect;
    //             dancer[i].c="#ffffff"; drawdancer(i,dancer[i].xc,dancer[i].yc,dancer[i].ac)
    //             findset(i,"c");
    //             j=dancer[i].p; if (j>=0) { dancer[j].c="#000000"; drawdancer(j,dancer[j].x,dancer[j].y,dancer[j].a) }
    //             j=dancer[i].n; if (j>=0) { dancer[j].c="#ff0000"; drawdancer(j,dancer[j].x,dancer[j].y,dancer[j].a) }
    //             j=dancer[i].o; if (j>=0) { dancer[j].c="#00ff00"; drawdancer(j,dancer[j].x,dancer[j].y,dancer[j].a) }
    //// finds second woman on upper right, and second woman on lower left (bb note they must have y = +-50
    //        i = enddancers();
    //        j = i.wsur; dancer[j].c = 0xff; drawdancer(j, dancer[j].x, dancer[j].y, dancer[j].a, "");
    //        j = i.wsll; dancer[j].c = 0xff0000; drawdancer(j, dancer[j].x, dancer[j].y, dancer[j].a, "");
    showdanceroutines("dancetext0");
}

function setcynnext() {
    // sets the global variable cynnext to index for next path segment call
    //   has to skip over those starting with + which mean combine with previous
    // NOTE if the parameter string as a + in it this will screw it up!
    var k;
    for (k = cyn + 1; p[k].indexOf("+") >= 0; k++);
    cynnext = k;
    if (p[cynnext] == "reset") cynnext = 2;
}

function addpath(i) {
    //bill note i does not SEEM to be used, BUT it appears in the strings in p[] which are evaluated in this
    // routines which set of the paths for dancer i

    var k;
    endopts = " ";
    endoptsx = " ";
    eval(p[cyn]);
    //bill
    debugaddpath.innerHTML = "addpath evaluated p[" + cyn + "]= " + p[cyn];

    for (k = cyn + 1; p[k].indexOf("+") >= 0; k++) {
        debugaddpath.innerHTML = debugaddpath.innerHTML + "<br>p[" + k + "]= " + p[k].substr(p[k].indexOf("+") + 1);
        eval(p[k].substr(p[k].indexOf("+") + 1));
    }
    if (endoptsx != " ") {
        k = cyn - 1;
        if (k == 1) {
            while (p[k] != "reset") k++;
            k--;
        }
        if (p[k].indexOf("endopts=") < 0) p[k] = 'endopts= "' + endoptsx + '"; ' + p[k];
    }
    null;
}

//bill determinant of 3x3 matrix
function dm(x11, x12, x13, x21, x22, x23, x31, x32, x33) {
    return x11 * (x22 * x33 - x23 * x32) - x12 * (x21 * x33 - x23 * x31) + x13 * (x21 * x32 - x22 * x31);
}
//bill returns coors and arclenth of circle thru 3 pts
function cirx(x1, y1, x2, y2, x3, y3) {
    var ca, cd;
    ca = dm(x1, y1, 1, x2, y2, 1, x3, y3, 1);
    cd = -dm(x1 * x1 + y1 * y1, y1, 1, x2 * x2 + y2 * y2, y2, 1, x3 * x3 + y3 * y3, y3, 1);
    return -cd / ca / 2;
}
function ciry(x1, y1, x2, y2, x3, y3) {
    var ca, ce;
    ca = dm(x1, y1, 1, x2, y2, 1, x3, y3, 1);
    ce = dm(x1 * x1 + y1 * y1, x1, 1, x2 * x2 + y2 * y2, x2, 1, x3 * x3 + y3 * y3, x3, 1);
    return -ce / ca / 2;
}
function cira(x1, y1, x2, y2, x3, y3) {
    var a1, a2, a3, ca, cd, ce, x0, y0;
    ca = dm(x1, y1, 1, x2, y2, 1, x3, y3, 1);
    cd = -dm(x1 * x1 + y1 * y1, y1, 1, x2 * x2 + y2 * y2, y2, 1, x3 * x3 + y3 * y3, y3, 1);
    ce = dm(x1 * x1 + y1 * y1, x1, 1, x2 * x2 + y2 * y2, x2, 1, x3 * x3 + y3 * y3, x3, 1);
    x0 = -cd / ca / 2;
    y0 = -ce / ca / 2;
    a1 = -Math.atan2((y1 - y0), (x1 - x0)) / rpd;
    a2 = -Math.atan2((y2 - y0), (x2 - x0)) / rpd - a1;
    while (a2 < 0) a2 += 360;
    while (a2 >= 360) a2 -= 360;
    a3 = -Math.atan2((y3 - y0), (x3 - x0)) / rpd - a1;
    while (a3 < 0) a3 += 360;
    while (a3 >= 360) a3 -= 360;
    if (a2 <= a3) return -a3; else return 360 - a3;
}

function whichdir(o) {
    for (i = 0; i < o.length; i++) {
        if (o.indexOf("a") >= 0) return "a";
        if (o.indexOf("d") >= 0) return "d";
        if (o.indexOf("e") >= 0) return "e";
        if (o.indexOf("s") >= 0) return "s";
        if (o.indexOf("r") >= 0) return "r";
        if (o.indexOf("n") >= 0) return "n";
        if (o.indexOf("t") >= 0) return "t";
        if (o.indexOf("u") >= 0) return "u";
        if (o.indexOf("p") >= 0) return "p";
        if (o.indexOf("y") >= 0) return "y";
    }
    return "";
}

function whatangle(q, t) {
    // assume the dance is part of a square set of four
    // quadrant - 10
    //            23
    // "a" end facing across
    // "d" end ready for left diagonal (same as "a" because +30000 or +40000 resets angle)
    // "e" end ready for right diagonal (same as "a" because +30000 or +40000 resets angle)
    // "s" end ready for a star left
    // "r" end ready for a star right
    // "n" end ready for a star left with the next
    // "t" end ready for a star right with the next
    // "u" end up/down
    // "y" end down
    // "p" end progressed
    var a;

    if ((q & 1) == 0) {
        if (t == "u") a = -90;
        else if (t == "p") a = 90;
        else if (t == "s") a = -90;
        else if (t == "y") a = -90;
        else if (t == "t") a = 90;
        else a = 0;
    }
    else {
        if (t == "u") a = 90;
        else if (t == "p") a = -90;
        else if (t == "r") a = 90;
        else if (t == "n") a = -90;
        else if (t == "y") a = -90;
        else a = 0;
    }
    if ((q & 2) != 0) {
        if (a <= 0) a += 180; else a -= 180;
    }

    return a;
}

function normalangle(a, j) { // normalize angle from j to j+360;
    var b, k;
    k = j + 360;
    b = a;
    while (b >= k) b -= 360;
    while (b < j) b += 360;
    return b;
}

function rangex(i, j, k, l) {
    var x, a, b, c, d;
    x = 0;
    a = dancer[i].x;
    b = dancer[j].x;
    c = dancer[k].x;
    d = dancer[l].x;
    if (Math.abs(a - b) > x) x = Math.abs(a - b);
    if (Math.abs(a - c) > x) x = Math.abs(a - c);
    if (Math.abs(a - d) > x) x = Math.abs(a - d);
    if (Math.abs(b - c) > x) x = Math.abs(b - c);
    if (Math.abs(b - d) > x) x = Math.abs(b - d);
    if (Math.abs(c - d) > x) x = Math.abs(c - d);
    return x;
}

function whichquad(i, a) {
    // quadrant after rotation a - 10
    //                             23
    var q;
    if (dancer[i].y < 0) {
        if (dancer[dancer[i].p].y < 0) if (dancer[i].x < dancer[dancer[i].p].x) q = 1; else q = 0;
        if (dancer[dancer[i].n].y < 0) if (dancer[i].x < dancer[dancer[i].n].x) q = 1; else q = 0;
    }
    else {
        if (dancer[dancer[i].p].y > 0) if (dancer[i].x < dancer[dancer[i].p].x) q = 2; else q = 3;
        if (dancer[dancer[i].n].y > 0) if (dancer[i].x < dancer[dancer[i].n].x) q = 2; else q = 3;
    }
    return (q + 16 + Math.round(a / 90)) % 4;
}

function whichquadstar(i, a) {
    // quadrant after rotation a -  0
    //                             1 3
    //                              2
    var q;
    if ((dancer[i].y < dancer[dancer[i].p].y) && (dancer[i].y < dancer[dancer[i].n].y)) q = 0;
    else if ((dancer[i].x < dancer[dancer[i].p].x) && (dancer[i].x < dancer[dancer[i].n].x)) q = 1;
    else if ((dancer[i].y > dancer[dancer[i].p].y) && (dancer[i].y > dancer[dancer[i].n].y)) q = 2;
    else q = 3;
    return (q + 16 + Math.round(a / 90)) % 4;
}

function xor(a, b) {
    return (a && (!b)) || ((!a) && b);
}
function sqr(x) {
    return x * x;
}
function hyp(x, y) {
    return Math.sqrt(x * x + y * y);
}
function dis(i, j) {
    return hyp(dancer[i].x - dancer[j].x, dancer[i].y - dancer[j].y);
}
function finddancer(i, d) {
    // i is dancer number
    // "b" look for dancer behind
    // "f" look for forward dancer
    // "a" look for far forward dancer
    // "l" look for dancer on the left
    // "r" look for dancer on the right
    // "c" look for dancer across the set
    // "w" look for dancer in wave right
    // "x" look for dancer in wave left
    // "i" look for dancer too close
    // "s" look for dancer ahead in a star
    var x0, x1, x3, y0, y1, y3, a, j, k;
    if (i < 0) {
        return -1;
    }
    a = dancer[i].a * rpd;
    x0 = dancer[i].x;
    y0 = dancer[i].y;
    for (j = 25; j <= 150; j += 25) {
        if (d == "f") {
            x1 = j * Math.sin(a) + x0;
            y1 = j * Math.cos(a) + y0;
        }
        else if (d == "b") {
            x1 = -j * Math.sin(a) + x0;
            y1 = -j * Math.cos(a) + y0;
        }
        else if (d == "r") {
            x1 = -j * Math.cos(a) + x0;
            y1 = j * Math.sin(a) + y0;
        }
        else if (d == "l") {
            x1 = j * Math.cos(a) + x0;
            y1 = -j * Math.sin(a) + y0;
        }
        else if (j >= 75) break;
        else if (d == "c") {
            x1 = x0;
            if (y0 < 0) y1 = 50; else y1 = -50;
        }
        else if (d == "w") {
            x1 = 34 * Math.sin(a) - 87.5 * Math.cos(a) + x0;
            y1 = 34 * Math.cos(a) + 87.5 * Math.sin(a) + y0;
        }
        else if (d == "x") {
            x1 = 34 * Math.sin(a) + 87.5 * Math.cos(a) + x0;
            y1 = 34 * Math.cos(a) - 87.5 * Math.sin(a) + y0;
        }
        else if (d == "a") {
            x1 = 25 * 6 * r2 * Math.sin(a) + x0;
            y1 = 25 * 6 * r2 * Math.cos(a) + y0;
        }
        else if (d == "i") {
            x1 = x0;
            y1 = y0;
        }
        else if (d == "s") {
            x1 = 50 * Math.sin(a) + 50 * Math.cos(a) + x0;
            y1 = 50 * Math.cos(a) - 50 * Math.sin(a) + y0;
        }
        for (k = 0; k <= topdancer; k++) if (k != i) {
            x3 = dancer[k].x;
            y3 = dancer[k].y;
            if (hyp(x1 - x3, y1 - y3) < (j * 0.5)) {
                return k;
            }
        }
    }
    return -1;
}
function findsetx(i, t) {
    // i is dancer number
    // "a" allemande left position ready for two dancer interaction
    // "b" allemande right position ready for two dancer interaction
    // "c" left diagonal, lor or lol
    // "d" side by side, lady on the right, ready for two dancer interaction (California twirl)
    // "e" side by side, lady on the left, ready for two dancer interaction
    // "f" face to face ready for two dancer interaction
    // "g" face to face opposite sex ready for two dancer interaction
    // "h" allemande to hey, pass right
    // "i" allemande to hey, men pass left
    // "j" face to face opposite sex ready for two dancer interaction, can adjust at ends
    // "k" allemande to hey, men pass left
    // "l" lady on the left, couple facing couple set
    // "m" star left to men allemande left
    // "n" star left to women allemande left
    // "o" true star left (already in position)
    // "p" star promenade
    // "r" lady on the right, couple facing couple set
    // "s" star left formation
    // "t" star right formation
    // "u" star left formation, lady on the left
    // "v" star right formation, lady on the left
    // "w" right hand wave opposite sex
    // "x" left hand wave  opposite sex
    // "0" right hand wave same sex
    // "1" left hand wave  same sex
    // "y" wave across left hand in the middle
    // "z" wave across right hand in the middle
    var j, k, n, p, o, t2;

    //bill why are all these be cleared? Only i maybe?
    // why is p being destroyed for all the other dancers when figuring out dancer i?
    if (BillQuestion) {
        dancer[i].p = -1;
    } else { // original code
        for (j = 0; j <= topdancer; j++) dancer[j].p = -1;
    }


    if (t == "f") { // two dancers face to face
        o = finddancer(i, "f");
        n = o;
        p = o;
        if (finddancer(o, "f") != i) p = -1;
        else if (dis(i, p) > 125) p = -1;
    }
    else if ((t == "g") || t == "j") { // two dancers face to face opposite sex, "j" can adjust on the ends
        o = finddancer(i, "f");
        n = o;
        p = o;
        if ((finddancer(o, "f") != i) || (dancer[i].s == dancer[o].s)) p = -1;
        else if (dis(i, p) > 125) p = -1;
    }
    else if (t == "d") { // two dancers side by side, lady on the right
        if (dancer[i].s == man) o = finddancer(i, "r"); else o = finddancer(i, "l");
        n = o;
        p = o;
        if ((dancer[i].s == man) && (finddancer(o, "l") != i)) p = -1;
        if ((dancer[i].s == woman) && (finddancer(o, "r") != i)) p = -1;
    }
    else if (t == "e") { // two dancers side by side, lady on the left
        if (dancer[i].s == man) o = finddancer(i, "l"); else o = finddancer(i, "r");
        n = o;
        p = o;
        if ((dancer[i].s == man) && (finddancer(o, "r") != i)) p = -1;
        if ((dancer[i].s == woman) && (finddancer(o, "l") != i)) p = -1;
    }
    else if ((t == "w") || (t == "x")) { // wavy lines opposite sex, right and left
        o = finddancer(i, t);
        n = o;
        p = o;
        if ((finddancer(o, t) != i) || (dancer[i].s == dancer[o].s)) p = -1;
    }
    else if ((t == "0") || (t == "1")) { // wavy lines same sex, right and left
        if (t == "0") t2 = "w"; else t2 = "x";
        o = finddancer(i, t2);
        n = o;
        p = o;
        if ((finddancer(o, t2) != i) || (dancer[i].s != dancer[o].s)) p = -1;
    }
    else if (t == "y") { // wave across left hand in the middle
        n = finddancer(i, "w");
        if (Math.abs(dancer[i].y) > 75) {
            p = finddancer(n, "x");
            o = finddancer(p, "w");
        }
        else {
            o = finddancer(i, "x");
            p = finddancer(o, "w");
        }
        if ((n < 0) || (o < 0) || (finddancer(n, "w") < 0)) p = -1;
    }
    else if (t == "z") { // wave across right hand in the middle
        n = finddancer(i, "x");
        if (Math.abs(dancer[i].y) > 75) {
            p = finddancer(n, "w");
            o = finddancer(p, "x");
        }
        else {
            o = finddancer(i, "w");
            p = finddancer(o, "x");
        }
        if ((n < 0) || (o < 0) || (finddancer(n, "w") < 0)) p = -1;
    }
    else if (t == "a") { // two dancers allemande left position
        o = finddancer(i, "l");
        n = o;
        p = o;
        if ((finddancer(o, "l") != i) || (dis(i, o) > 105)) p = -1;
    }
    else if (t == "b") { // two dancers allemande right position
        o = finddancer(i, "r");
        n = o;
        p = o;
        if ((finddancer(o, "r") != i) || (dis(i, o) > 105)) p = -1;
    }
    else if (t == "o") { // true star left (dancers already in position)
        p = finddancer(i, "s");
        o = finddancer(p, "s");
        n = finddancer(o, "s");
        if (finddancer(n, "s") != i) p = -1;
    }
    else if (t == "h") { // allemande to hey, ladies pass right
        p = finddancer(i, "l");
        if (dancer[i].s == man) {
            n = finddancer(i, "b");
            o = finddancer(p, "f");
        }
        else {
            n = finddancer(i, "f");
            o = finddancer(p, "b");
        }
        if ((n < 0) || (p < 0) || (o < 0)) p = -1;
        if ((dancer[i].s == man) && ((finddancer(n, "f") != i) || (finddancer(o, "b") != p))) p = -1;
        if ((dancer[i].s == woman) && ((finddancer(n, "b") != i) || (finddancer(o, "f") != p))) p = -1;
    }
    else if (t == "m") { // star left to men allemande left
        if (dancer[i].s == man) {
            o = finddancer(i, "l");
            p = finddancer(i, "f");
            n = finddancer(o, "f");
        }
        else {
            p = finddancer(i, "l");
            n = finddancer(p, "l");
            o = finddancer(n, "f");
        }
        if ((n < 0) || (p < 0) || (o < 0)) p = -1;
        else if ((dancer[i].s == man) && ((finddancer(o, "l") != i) || (finddancer(p, "l") != i))) p = -1;
        else if ((dancer[i].s == woman) && ((finddancer(p, "f") != i) || (finddancer(n, "f") != o) || (finddancer(n, "l") != p))) p = -1;
        else if (rangex(i, n, o, p) > 112.5) p = -1;
    }
    else if (t == "n") { // star left to women allemande left
        if (dancer[i].s == woman) {
            o = finddancer(i, "l");
            p = finddancer(i, "f");
            n = finddancer(o, "f");
        }
        else {
            p = finddancer(i, "l");
            n = finddancer(p, "l");
            o = finddancer(n, "f");
        }
        if ((n < 0) || (p < 0) || (o < 0)) p = -1;
        else if ((dancer[i].s == woman) && ((finddancer(o, "l") != i) || (finddancer(p, "l") != i))) p = -1;
        else if ((dancer[i].s == man) && ((finddancer(p, "f") != i) || (finddancer(n, "f") != o) || (finddancer(n, "l") != p))) p = -1;
        else if (rangex(i, n, o, p) > 112.5) p = -1;
    }
    else if (t == "p") { // star promenade
        if (dancer[i].s == man) {
            o = finddancer(i, "l");
            p = finddancer(i, "r");
            n = finddancer(o, "r");
        }
        else {
            p = finddancer(i, "l");
            n = finddancer(p, "l");
            o = finddancer(n, "r");
        }
        if ((n < 0) || (p < 0) || (o < 0)) p = -1;
        if ((dancer[i].s == man) && ((finddancer(o, "l") != i) || (finddancer(p, "l") != i))) p = -1;
        if ((dancer[i].s == woman) && ((finddancer(p, "r") != i) || (finddancer(n, "l") != p))) p = -1;
    }
    else if (t == "i") { // allemande to hey, men pass left
        p = finddancer(i, "r");
        if (dancer[i].s == man) {
            n = finddancer(i, "f");
            o = finddancer(p, "b");
        }
        else {
            n = finddancer(i, "b");
            o = finddancer(p, "f");
        }
        if ((n < 0) || (p < 0) || (o < 0)) p = -1;
        if ((dancer[i].s == man) && ((finddancer(n, "b") != i) || (finddancer(o, "f") != p))) p = -1;
        if ((dancer[i].s == woman) && ((finddancer(n, "f") != i) || (finddancer(o, "b") != p))) p = -1;
    }
    else if (t == "k") { // allemande to hey, ladies pass left
        p = finddancer(i, "r");
        if (dancer[i].s == woman) {
            n = finddancer(i, "f");
            o = finddancer(p, "b");
        }
        else {
            n = finddancer(i, "b");
            o = finddancer(p, "f");
        }
        if ((n < 0) || (p < 0) || (o < 0)) p = -1;
        else if ((dancer[i].s == woman) && ((finddancer(n, "b") != i) || (finddancer(o, "f") != p))) p = -1;
        else if ((dancer[i].s == man) && ((finddancer(n, "f") != i) || (finddancer(o, "b") != p))) p = -1;
    }
    else if (t == "r") { // lady on the right, couple facing couple
        if (dancer[i].s == man) p = finddancer(i, "r"); else p = finddancer(i, "l");
        n = finddancer(i, "f");
        o = finddancer(p, "f");
        if ((n < 0) || (p < 0) || (o < 0)) p = -1;
        else if ((finddancer(n, "f") != i) || (finddancer(o, "f") != p)) p = -1;
        else if ((dancer[i].s == man) && (finddancer(p, "l") != i)) p = -1;
        else if ((dancer[i].s == woman) && (finddancer(p, "r") != i)) p = -1;
        else if (dancer[i].s == dancer[p].s) p = -1;
        // else if (rangex(i,n,o,p)>112.5) p=-1;
    }
    else if (t == "c") { // left or right diagonal
        p = finddancer(i, "r");
        if (finddancer(p, "l") != i) p = -1;
        if (p < 0) {
            p = finddancer(i, "l");
            if ((finddancer(p, "r") != i) || (dancer[i].s == dancer[p].s)) p = -1;
        }
        n = finddancer(i, "a");
        if ((n < 0) || (finddancer(n, "a") != i) || (dancer[i].s == dancer[n].s)) p = -1;
        o = finddancer(p, "a");
        if ((o < 0) || (finddancer(o, "a") != p)) p = -1;
    }
    else if (t == "l") { // lady on the left, couple facing couple
        if (dancer[i].s == man) p = finddancer(i, "l"); else p = finddancer(i, "r");
        n = finddancer(i, "f");
        o = finddancer(p, "f");
        if ((n < 0) || (p < 0) || (o < 0)) p = -1;
        else if ((finddancer(n, "f") != i) || (finddancer(o, "f") != p)) p = -1;
        else if ((dancer[i].s == man) && (finddancer(p, "r") != i)) p = -1;
        else if ((dancer[i].s == woman) && (finddancer(p, "l") != i)) p = -1;
        else if (dancer[i].s == dancer[p].s) p = -1;
        // else if (rangex(i,n,o,p)>112.5) p=-1;
    }
    else if (t == "s") { // star left
        p = finddancer(i, "f");
        o = finddancer(p, "f");
        n = finddancer(o, "f");
        k = finddancer(n, "f");
        if (dancer[i].s == woman) {
            j = p;
            p = n;
            n = j;
        }
        if (k != i) p = -1;
        else if ((dancer[i].s == man) && (finddancer(i, "l") != n)) p = -1;
        else if ((dancer[i].s == woman) && (finddancer(i, "l") != p)) p = -1;
        else if (Math.round(dis(i, n) / 10) < Math.round(dis(i, p) / 10)) p = -1;
    }
    else if (t == "u") { // star left, lady on the left
        n = finddancer(i, "f");
        o = finddancer(n, "f");
        p = finddancer(o, "f");
        k = finddancer(p, "f");
        if (dancer[i].s == woman) {
            j = p;
            p = n;
            n = j;
        }
        if (k != i) p = -1;
        else if ((dancer[i].s == woman) && (finddancer(i, "l") != n)) p = -1;
        else if ((dancer[i].s == man) && (finddancer(i, "l") != p)) p = -1;
        else if (Math.round(dis(i, n) / 10) < Math.round(dis(i, p) / 10)) p = -1;
    }
    else if (t == "t") { // star right
        n = finddancer(i, "f");
        o = finddancer(n, "f");
        p = finddancer(o, "f");
        k = finddancer(p, "f");
        if (dancer[i].s == woman) {
            j = p;
            p = n;
            n = j;
        }
        if (k != i) p = -1;
        else if ((dancer[i].s == man) && (finddancer(i, "r") != p)) p = -1;
        else if ((dancer[i].s == woman) && (finddancer(i, "r") != n)) p = -1;
        else if (Math.round(dis(i, n) / 10) < Math.round(dis(i, p) / 10)) p = -1;
    }
    else if (t == "v") { // star right, lady on the left
        p = finddancer(i, "f");
        o = finddancer(p, "f");
        n = finddancer(o, "f");
        k = finddancer(n, "f");
        if (dancer[i].s == woman) {
            j = p;
            p = n;
            n = j;
        }
        if (k != i) p = -1;
        else if ((dancer[i].s == woman) && (finddancer(i, "r") != p)) p = -1;
        else if ((dancer[i].s == man) && (finddancer(i, "r") != n)) p = -1;
        else if (Math.round(dis(i, n) / 10) < Math.round(dis(i, p) / 10)) p = -1;
    }
    else p = -1;

    if (p < 0) {
        dancer[i].p = -1;
        dancer[i].n = -1;
        dancer[i].o = -1;
        return -1;
    }

    dancer[i].p = p;
    dancer[i].n = n;
    dancer[i].o = o;
    return 0;
}

function findsetupdate(i, j) {
    dancer[i].x0 = dancer[i].x;
    dancer[i].y0 = dancer[i].y;
    dancer[i].a0 = dancer[i].a;
    dancer[i].xc = dancer[i].x;
    dancer[i].yc = dancer[i].y;
    dancer[i].ac = dancer[i].a;
    dancer[j].x0 = dancer[j].x;
    dancer[j].y0 = dancer[j].y;
    dancer[j].a0 = dancer[j].a;
    dancer[j].xc = dancer[j].x;
    dancer[j].yc = dancer[j].y;
    dancer[j].ac = dancer[j].a;
}
function findset(i, t) {
    //bill after this call the dancer[i].p .n and .o will be found for option t as in findsetx
    var j, xi, xj, yi, yj, ai, aj, ll, ur, lr, ul;

    findsetx(i, t);
    //bill if the dancer is not on the end or the ends have been looked at done
    if ((!dancer[i].e) || (endoptsdone == 0)) return;
    //bill if p has been found set the end option as "i" for improper?? and are done
    if (dancer[i].p >= 0) {
        endoptsx = "i ";
        return;
    }

    // from here on is to handle end effects

    ll = (dancer[i].x < -400) && (dancer[i].y > 0);
    ur = (dancer[i].x > -400) && (dancer[i].y < 0);
    lr = (dancer[i].x > -400) && (dancer[i].y > 0);
    ul = (dancer[i].x < -400) && (dancer[i].y < 0);

    for (j = 0; j <= topdancer; j++) {

        if ((i != j) && (dancer[j].e) && (((dancer[i].x > -400) && (dancer[j].x > -400)) || ((dancer[i].x <= -400) && (dancer[j].x <= -400)))) {
            // finds j the other inactive dancer on the same side as i
            xi = dancer[i].x;
            yi = dancer[i].y;
            ai = dancer[i].a;
            xj = dancer[j].x;
            yj = dancer[j].y;
            aj = dancer[j].a;

            if ((t == "w") || (t == "x")) {
                // try improper wavy line formation w
                if (ur || lr) {
                    dancer[i].y = yi - 17;
                    dancer[j].y = yj - 17;
                } else {
                    dancer[i].y = yi + 17;
                    dancer[j].y = yj + 17;
                }
                dancer[i].a += 90;
                dancer[j].a += 90;
                findsetx(i, t);
                if (dancer[i].p >= 0) {
                    findsetupdate(i, j);
                    endoptsx = "iv";
                    return;
                }
                dancer[i].a = ai;
                dancer[i].y = yi;
                dancer[j].a = aj;
                dancer[j].y = yj;
                // try reverse improper wavy line formation w
                if (ur || lr) {
                    dancer[i].y = yj - 17;
                    dancer[j].y = yi - 17;
                } else {
                    dancer[i].y = yj + 17;
                    dancer[j].y = yi + 17;
                }
                dancer[i].a += 90;
                dancer[j].a += 90;
                findsetx(i, t);
                if (dancer[i].p >= 0) {
                    findsetupdate(i, j);
                    endoptsx = "xv";
                    return;
                }
                dancer[i].a = ai;
                dancer[i].y = yi;
                dancer[j].a = aj;
                dancer[j].y = yj;
                // try improper wavy line formation x
                if (ur || lr) {
                    dancer[i].y = yi + 17;
                    dancer[j].y = yj + 17;
                } else {
                    dancer[i].y = yi - 17;
                    dancer[j].y = yj - 17;
                }
                dancer[i].a -= 90;
                dancer[j].a -= 90;
                findsetx(i, t);
                if (dancer[i].p >= 0) {
                    findsetupdate(i, j);
                    endoptsx = "iu";
                    return;
                }
                dancer[i].a = ai;
                dancer[i].y = yi;
                dancer[j].a = aj;
                dancer[j].y = yj;
                // try reverse improper wavy line formation x
                if (ur || lr) {
                    dancer[i].y = yj + 17;
                    dancer[j].y = yi + 17;
                } else {
                    dancer[i].y = yj - 17;
                    dancer[j].y = yi - 17;
                }
                dancer[i].a -= 90;
                dancer[j].a -= 90;
                findsetx(i, t);
                if (dancer[i].p >= 0) {
                    findsetupdate(i, j);
                    endoptsx = "xu";
                    return;
                }
                dancer[i].a = ai;
                dancer[i].y = yi;
                dancer[j].a = aj;
                dancer[j].y = yj;
                break;
            }

            if ((t == "s") || (t == "u")) {
                // try star left formation
                if (lr || ul) dancer[i].a -= 90; else dancer[j].a -= 90;
                findsetx(i, t);
                if (dancer[i].p >= 0) {
                    findsetupdate(i, j);
                    endoptsx = "is";
                    return;
                }
                dancer[i].a = ai;
                dancer[j].a = aj;
                break;
            }
            if ((t == "t") || (t == "v")) {
                // try star right formation
                if (ur || ll) dancer[i].a += 90; else dancer[j].a += 90;
                findsetx(i, t);
                if (dancer[i].p >= 0) {
                    findsetupdate(i, j);
                    endoptsx = "it";
                    return;
                }
                dancer[i].a = ai;
                dancer[j].a = aj;
                break;
            }
            if (t == "a") {
                // allemande progression 1
                if (lr) {
                    dancer[i].y -= 50;
                    dancer[i].a -= 90;
                    dancer[j].y += 100;
                    dancer[j].x += 50;
                }
                if (ur) {
                    dancer[j].y -= 50;
                    dancer[j].a -= 90;
                    dancer[i].y += 100;
                    dancer[i].x += 50;
                }
                if (ul) {
                    dancer[i].y += 50;
                    dancer[i].a -= 90;
                    dancer[j].y -= 100;
                    dancer[j].x -= 50;
                }
                if (ll) {
                    dancer[j].y += 50;
                    dancer[j].a -= 90;
                    dancer[i].y -= 100;
                    dancer[i].x -= 50;
                }
                findsetx(i, t);
                if (dancer[i].p >= 0) {
                    findsetupdate(i, j);
                    endoptsx = "xn";
                    return;
                }
                dancer[i].x = xi;
                dancer[i].y = yi;
                dancer[i].a = ai;
                dancer[j].x = xj;
                dancer[j].y = yj;
                dancer[j].a = aj;
            }
            if (t == "b") {
                // allemande progression 2
                if (lr) {
                    dancer[j].y += 50;
                    dancer[j].a += 90;
                    dancer[i].y -= 100;
                    dancer[i].x += 50;
                }
                if (ur) {
                    dancer[i].y += 50;
                    dancer[i].a += 90;
                    dancer[j].y -= 100;
                    dancer[j].x += 50;
                }
                if (ul) {
                    dancer[j].y -= 50;
                    dancer[j].a += 90;
                    dancer[i].y += 100;
                    dancer[i].x -= 50;
                }
                if (ll) {
                    dancer[i].y -= 50;
                    dancer[i].a += 90;
                    dancer[j].y += 100;
                    dancer[j].x -= 50;
                }
                findsetx(i, t);
                if (dancer[i].p >= 0) {
                    findsetupdate(i, j);
                    endoptsx = "xo";
                    return;
                }
                dancer[i].x = xi;
                dancer[i].y = yi;
                dancer[i].a = ai;
                dancer[j].x = xj;
                dancer[j].y = yj;
                dancer[j].a = aj;
            }

            // try reverse improper
            dancer[i].y = yj;
            dancer[j].y = yi;
            findsetx(i, t);
            if (dancer[i].p >= 0) {
                findsetupdate(i, j);
                endoptsx = "x ";
                return;
            }
            dancer[i].y = yi;
            dancer[j].y = yj;

            if ("abdefg".indexOf(t) >= 0) return; // two person interactions

            // try improper facing in
            if ((ur) || (ll)) {
                dancer[i].a += 90;
                dancer[j].a -= 90;
            } else {
                dancer[i].a -= 90;
                dancer[j].a += 90;
            }
            findsetx(i, t);
            if (dancer[i].p >= 0) {
                findsetupdate(i, j);
                endoptsx = "ia";
                return;
            }
            dancer[i].a = ai;
            dancer[j].a = aj;
            // try reverse improper facing in
            dancer[i].y = yj;
            dancer[j].y = yi;
            if ((ur) || (ll)) {
                dancer[i].a -= 90;
                dancer[j].a += 90;
            } else {
                dancer[i].a += 90;
                dancer[j].a -= 90;
            }
            findsetx(i, t);
            if (dancer[i].p >= 0) {
                findsetupdate(i, j);
                endoptsx = "xa";
                return;
            }
            dancer[i].y = yi;
            dancer[i].a = ai;
            dancer[j].y = yj;
            dancer[j].a = aj;
            // try improper slide right
            dancer[i].a += 90;
            dancer[j].a += 90;
            if (ur) {
                dancer[i].x -= 100;
                dancer[j].y -= 100;
            }
            if (lr) {
                dancer[i].y -= 100;
                dancer[j].x -= 100;
            }
            if (ll) {
                dancer[i].x += 100;
                dancer[j].y += 100;
            }
            if (ul) {
                dancer[i].y += 100;
                dancer[j].x += 100;
            }
            findsetx(i, t);
            if ((dancer[i].p >= 0) && (finddancer(i, "i") < 0) && (finddancer(j, "i") < 0)) {
                findsetupdate(i, j);
                endoptsx = "il";
                return;
            }
            dancer[i].x = xi;
            dancer[i].y = yi;
            dancer[i].a = ai;
            dancer[j].x = xj;
            dancer[j].y = yj;
            dancer[j].a = aj;
            // try improper slide left
            dancer[i].a -= 90;
            dancer[j].a -= 90;
            if (ur) {
                dancer[i].y += 100;
                dancer[j].x -= 100;
            }
            if (lr) {
                dancer[i].x -= 100;
                dancer[j].y += 100;
            }
            if (ll) {
                dancer[i].y -= 100;
                dancer[j].x += 100;
            }
            if (ul) {
                dancer[i].x += 100;
                dancer[j].y -= 100;
            }
            findsetx(i, t);
            if ((dancer[i].p >= 0) && (finddancer(i, "i") < 0) && (finddancer(j, "i") < 0)) {
                findsetupdate(i, j);
                endoptsx = "im";
                return;
            }
            dancer[i].x = xi;
            dancer[i].y = yi;
            dancer[i].a = ai;
            dancer[j].x = xj;
            dancer[j].y = yj;
            dancer[j].a = aj;
            // try diagonal
            if (lr) {
                dancer[i].y += 50;
                dancer[j].y += 100;
                dancer[j].x += 50;
            }
            if (ur) {
                dancer[j].y += 50;
                dancer[i].y += 100;
                dancer[i].x += 50;
            }
            if (ul) {
                dancer[i].y -= 50;
                dancer[j].y -= 100;
                dancer[j].x -= 50;
            }
            if (ll) {
                dancer[j].y -= 50;
                dancer[i].y -= 100;
                dancer[i].x -= 50;
            }
            dancer[i].a -= 45;
            dancer[j].a -= 45;
            findsetx(i, t);
            if (dancer[i].p >= 0) {
                findsetupdate(i, j);
                endoptsx = "id";
                return;
            }
            dancer[i].x = xi;
            dancer[i].y = yi;
            dancer[i].a = ai;
            dancer[j].x = xj;
            dancer[j].y = yj;
            dancer[j].a = aj;
            // try diagonal reverse improper
            if (lr) {
                dancer[i].x += 50;
                dancer[j].y += 150;
            }
            if (ur) {
                dancer[j].x += 50;
                dancer[i].y += 150;
            }
            if (ul) {
                dancer[i].x -= 50;
                dancer[j].y -= 150;
            }
            if (ll) {
                dancer[j].x -= 50;
                dancer[i].y -= 150;
            }
            dancer[i].a -= 45;
            dancer[j].a -= 45;
            findsetx(i, t);
            if (dancer[i].p >= 0) {
                findsetupdate(i, j);
                endoptsx = "xe";
                return;
            }
            dancer[i].x = xi;
            dancer[i].y = yi;
            dancer[i].a = ai;
            dancer[j].x = xj;
            dancer[j].y = yj;
            dancer[j].a = aj;
            // try right diagonal
            if (lr) {
                dancer[j].y -= 50;
                dancer[i].y -= 100;
                dancer[i].x += 50;
            }
            if (ur) {
                dancer[i].y -= 50;
                dancer[j].y -= 100;
                dancer[j].x += 50;
            }
            if (ul) {
                dancer[j].y += 50;
                dancer[i].y += 100;
                dancer[i].x -= 50;
            }
            if (ll) {
                dancer[i].y += 50;
                dancer[j].y += 100;
                dancer[j].x -= 50;
            }
            dancer[i].a += 45;
            dancer[j].a += 45;
            findsetx(i, t);
            if (dancer[i].p >= 0) {
                findsetupdate(i, j);
                endoptsx = "ir";
                return;
            }
            dancer[i].x = xi;
            dancer[i].y = yi;
            dancer[i].a = ai;
            dancer[j].x = xj;
            dancer[j].y = yj;
            dancer[j].a = aj;
            break;
        }
    }
}

//bill think this is for dancers who are out
// the path find rountines all start with findset(i,.) in an attempt to find p,n,o to work with for dancer i
// if p is found, the dancer is marked as a non-end (dancer[].e = false) and processing continues but
// if p can't be found i.e. p returned at -1 then the routine quits and calls attend which seems to 
// mark the dancer as an end, change 1s to 2s and vice/versa, move to waiting spot and wait
function atend(i, mw, t2) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // "x" lady on the left to progress
    // "a" face across the rejoin the dance
    // "s" star left formation to rejoin the dance
    // "t" star right formation to rejoin the dance
    // "d" diagonal left to rejoin the dance
    // "e" diagonal left reverse improper to rejoin the dance
    // "r" diagonal right to rejoin the dance
    // "v" wavy lines to rejoin the dance
    // "u" wavy lines to rejoin the dance
    // "l" slide right to rejoin the dance
    // "m" slide left to rejoin the dance
    // "n" allemande progression 1
    // "o" allemande progression 2
    // "p" true star left progression
    // t>100 avoid collision (need at least 8 counts at end)
    var j, k, u, a2, s2, pn, ll, ur, lr, ul, l, t, a3;

    if (endoptsdone == 2) endopts = "";

    t = t2 % 100;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;
    dancer[i].e = true;
    //bill
    Debug.writeln("Dancer " + i + "mw= " + mw + " t2= " + t2 + " " + getStack());

    //        try {
    //            var err = Error("my error");
    //            //err.stack = "my stack trace";
    //            throw err;
    //        }
    //        catch (e) {
    //             Debug.writeln(e.stack);
    //        }


    //return // here bill to skip all attempts at dealing with ends

    ll = (dancer[i].x < -400) && (dancer[i].y >= 0);
    ur = (dancer[i].x >= -400) && (dancer[i].y < 0);
    lr = (dancer[i].x >= -400) && (dancer[i].y >= 0);
    ul = (dancer[i].x < -400) && (dancer[i].y < 0);

    if (ur || lr) dancer[i].t = 1; else dancer[i].t = 2;

    // which sex is on the left
    if (endopts.indexOf("x") >= 0) s2 = woman; else s2 = man;

    // go to rest location and face the set
    a2 = dancer[i].a;
    while (a2 < 0) a2 += 360;
    while (a2 >= 360) a2 -= 360;
    a3 = 0;
    if (ur) {
        if (a2 == 0) a3 = -90; else if (a2 == 90) a3 = -180; else if (a2 == 180) a3 = 90;
    }
    if (lr) {
        if (a2 == 0) a3 = -90; else if (a2 == 90) a3 = 180; else if (a2 == 180) a3 = 90;
    }
    if (ul) {
        if (a2 == 180) a3 = -90; else if (a2 == 270) a3 = 180; else if (a2 == 0) a3 = 90;
    }
    if (ll) {
        if (a2 == 180) a3 = -90; else if (a2 == 270) a3 = -180; else if (a2 == 0) a3 = 90;
    }

    x3 = -topx;
    if (dancer[i].s == s2) y3 = -50; else y3 = 50;
    if (ur || lr) {
        x3 = -100;
        y3 *= -1;
    }

    pn = dancer[i].pn;
    patht[pn] = -4;
    pathf[pn] = 0;
    paths[pn] = 0;
    pathb[pn] = a3;
    pn++;
    if (t >= 4) patht[pn] = 40; else patht[pn] = t * 10;
    if (s2 == man) j = 10000 - 48; else j = 10000 + 48;
    if ((dancer[i].x == x3) && (dancer[i].y == y3)) j = 0;
    if (ur || lr) {
        pathf[pn] = dancer[i].x - x3;
        paths[pn] = dancer[i].y - y3;
        patha[pn] = 40000 + a3;
        pathb[pn] = j;
    }
    else {
        pathf[pn] = x3 - dancer[i].x;
        paths[pn] = y3 - dancer[i].y;
        patha[pn] = 40000 + a3;
        pathb[pn] = j;
    }

    if (t2 > 100) pathf[pn] -= 50;

    ll = (x3 < -400) && (y3 >= 0);
    ur = (x3 >= -400) && (y3 < 0);
    lr = (x3 >= -400) && (y3 >= 0);
    ul = (x3 < -400) && (y3 < 0);

    // waste time
    if (t > 4) {
        pn++;
        patht[pn] = -3;
        if (t2 > 100) {
            if (t > 6) {
                pn++;
                patht[pn] = t * 10 - 60;
                pathf[pn] = 0;
                paths[pn] = 0;
                patha[pn] = 0;
                pathb[pn] = 0;
            }
            pn++;
            patht[pn] = 20;
            pathf[pn] = 50;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
        else {
            pn++;
            patht[pn] = t * 10 - 40;
            pathf[pn] = 0;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
        }

    }

    // reorient

    if (endopts.indexOf("s") >= 0) {
        if (lr || ul) patha[pn] = patht[pn] * 10000 - 90;
    }
    else if (endopts.indexOf("t") >= 0) {
        if (ur || ll) patha[pn] = patht[pn] * 10000 + 90;
    }
    else if (endopts.indexOf("a") >= 0) {
        if (lr || ul) patha[pn] = patht[pn] * 10000 - 90; else patha[pn] = patht[pn] * 10000 + 90;
    }
    else if (endopts.indexOf("v") >= 0) {
        patha[pn] = patht[pn] * 10000 + 90;
        paths[pn] += 17;
    }
    else if (endopts.indexOf("u") >= 0) {
        patha[pn] = patht[pn] * 10000 - 90;
        paths[pn] -= 17;
    }
    else if (endopts.indexOf("d") >= 0) {
        if ((dancer[i].s == man) && (lr || ul)) {
            pathf[pn] = 0;
            paths[pn] = -50;
            patha[pn] = patht[pn] * 10000 - 45;
        }
        if ((dancer[i].s == woman) && (ur || ll)) {
            pathf[pn] = -50;
            paths[pn] = -100;
            patha[pn] = patht[pn] * 10000 - 45;
            pathb[pn] = 10000 - 20;
        }
    }
    else if (endopts.indexOf("r") >= 0) {
        if ((dancer[i].s == woman) && (ll || ur)) {
            pathf[pn] = 0;
            paths[pn] = 50;
            patha[pn] = patht[pn] * 10000 + 45;
        }
        if ((dancer[i].s == man) && (lr || ul)) {
            pathf[pn] = -50;
            paths[pn] = 100;
            patha[pn] = patht[pn] * 10000 + 45;
            pathb[pn] = 10000 - 20;
        }
    }
    else if (endopts.indexOf("l") >= 0) {
        if (dancer[i].s == man) {
            pathf[pn] = 0;
            paths[pn] = 100;
            patha[pn] = patht[pn] * 10000 + 90;
            pathb[pn] = 0;
        }
        else {
            pathf[pn] = 100;
            paths[pn] = 0;
            patha[pn] = patht[pn] * 10000 + 90;
            pathb[pn] = 0;
        }
    }
    else if (endopts.indexOf("m") >= 0) {
        if (dancer[i].s == woman) {
            pathf[pn] = 0;
            paths[pn] = -100;
            patha[pn] = patht[pn] * 10000 - 90;
            pathb[pn] = 0;
        }
        else {
            pathf[pn] = 100;
            paths[pn] = 0;
            patha[pn] = patht[pn] * 10000 - 90;
            pathb[pn] = 0;
        }
    }
    else if (endopts.indexOf("n") >= 0) {
        if (dancer[i].s == woman) {
            pathf[pn] -= 50;
            paths[pn] = 0;
            pathb[pn] = 0;
        }
        else {
            paths[pn] -= 50;
            patha[pn] -= 90;
        }
    }
    else if (endopts.indexOf("o") >= 0) {
        if (dancer[i].s == man) {
            pathf[pn] -= 50;
            paths[pn] = 0;
            pathb[pn] = 0;
        }
        else {
            paths[pn] += 50;
            patha[pn] += 90;
        }
    }
    else if (endopts.indexOf("p") >= 0) {
        if (dancer[i].s == man) {
            paths[pn] = 50;
            patha[pn] = -90;
            pathb[pn] = 0;
        }
    }
    else if (endopts.indexOf("e") >= 0) {
        if ((dancer[i].s == woman) && (lr || ul)) {
            pathf[pn] = 0;
            paths[pn] = -50;
            patha[pn] = patht[pn] * 10000 - 45;
        }
        if ((dancer[i].s == man) && (ur || ll)) {
            pathf[pn] = -50;
            paths[pn] = -100;
            patha[pn] = patht[pn] * 10000 - 45;
            pathb[pn] = 10000 - 20;
        }
    }

    dancer[i].pn = pn + 1;
};

function CorrectDancerType(mw, i) {
    if (mw == all) return true;
    if (mw == men && dancer[i].s == men) return true;
    if (mw == women && dancer[i].s == women) return true;
    if (mw == 10 && dancer[i].s == men && dancer[i].t == 1) return true;
    if (mw == 20 && dancer[i].s == men && dancer[i].t == 2) return true;
    if (mw == 11 && dancer[i].s == women && dancer[i].t == 1) return true;
    if (mw == 21 && dancer[i].s == women && dancer[i].t == 2) return true;
    if (mw == 12 && dancer[i].t == 1) return true;
    if (mw == 22 && dancer[i].t == 2) return true;
    return false;
}

function makepathdirect(i, mw, t, f, s, a, b, r, opts) {
    if (!CorrectDancerType(mw, i)) return;
    pn = dancer[i].pn;
    patht[pn] = t;
    pathf[pn] = f;
    paths[pn] = s;
    patha[pn] = a;
    pathb[pn] = b;
    pathr[pn] = r;
    dancer[i].pn = pn + 1;
}


function snakeheywaves(i, mw, opts) {
    // mw is 2

    findset(i, "l");
    if (dancer[i].p < 0) {
        atend(i, mw, 16);
        return;
    }
    dancer[i].e = false;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == man) {
        pn++;
        patht[pn] = 20;
        pathf[pn] = -17;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 60;
        pathf[pn] = -17;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;

        pn++;
        patht[pn] = 40;
        pathf[pn] = 34;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 34;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 34;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 34;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 34;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else {
        pn++;
        patht[pn] = 15;
        pathf[pn] = 50;
        paths[pn] = 20;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 25;
        pathf[pn] = 67;
        paths[pn] = 100;
        patha[pn] = -180;
        pathb[pn] = 10000 - 60;
        pn++;
        patht[pn] = -3;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 0;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 0;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;

        pn++;
        patht[pn] = 40;
        pathf[pn] = -50;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 40;
        pathf[pn] = -50;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
    }

    dancer[i].pn = pn + 1;
}

function hey2passright(i, mw, opts) {
    // mw is 2

    findset(i, "g");
    if (dancer[i].p < 0) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (Math.abs(dancer[i].y) > 75) {
        pn++;
        patht[pn] = 22;
        pathf[pn] = 80;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 10000 - 70;
        pn++;
        patht[pn] = 22;
        pathf[pn] = 180;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 10000 + 70;
        pn++;
        patht[pn] = 36;
        pathf[pn] = 260;
        paths[pn] = 0;
        patha[pn] = 180;
        pathb[pn] = 10000 - 70;
    }
    else {
        pn++;
        patht[pn] = 36;
        pathf[pn] = 100;
        paths[pn] = 0;
        patha[pn] = 180;
        pathb[pn] = 10000 - 70;
        pn++;
        patht[pn] = 22;
        pathf[pn] = 30;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 10000 - 70;
        pn++;
        patht[pn] = 22;
        pathf[pn] = -60;
        paths[pn] = 0;
        patha[pn] = 200000 - 360;
        pathb[pn] = 10000 + 70;
    }

    dancer[i].pn = pn + 1;
}

function gypsywaves(i, mw, opts) {
    // mw is 2
    // "m" men go first
    // "a" all go in
    // "e" include the ends
    var s, en;

    en = false;
    findset(i, "r");
    if ((dancer[i].p < 0) && (opts.indexOf("e") >= 0)) {
        en = true;
        findset(i, "j");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, 16);
        return;
    }
    dancer[i].e = false;

    if (opts.indexOf("m") >= 0) s = woman; else s = man;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (opts.indexOf("a") >= 0) {
        pn++;
        patht[pn] = 30;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else if (dancer[i].s == s) {
        pn++;
        patht[pn] = 80;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;

        pn++;
        patht[pn] = 30;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else {
        pn++;
        patht[pn] = 30;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;

        pn++;
        patht[pn] = 40;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 25;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 33;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
    }

    dancer[i].pn = pn + 1;
}

function gypsystar(i, mw, t, a, opts) {
    // mw is 2
    // t time
    // a angle
    // "m" men back up
    // "c" counter-clockwise
    var mt, s, d, r;

    if (opts.indexOf("c") >= 0) r = -1; else r = 1;

    if (opts.indexOf("m") >= 0) {
        s = woman;
        if (r == 1) findset(i, "l"); else findset(i, "r");
    }
    else {
        s = man;
        if (r == 1) findset(i, "r"); else findset(i, "l");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    mt = Math.round(t * 10 / 6);
    d = Math.round(dis(i, dancer[i].n) / 2);

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == s) {
        pn++;
        patht[pn] = mt;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = t * 10 - mt * 2;
        pathf[pn] = d;
        paths[pn] = 50 * r;
        patha[pn] = (-a + 45) * r;
        pathb[pn] = (-a + 45) * r;
        pn++;
        patht[pn] = mt;
        pathf[pn] = d - 50;
        paths[pn] = 75 * r;
        patha[pn] = -45 * r;
        pathb[pn] = 10000 - 20;
    }
    else {
        pn++;
        patht[pn] = t * 10 - mt;
        pathf[pn] = d;
        paths[pn] = -50 * r;
        patha[pn] = -a * r;
        pathb[pn] = -a * r;
        pn++;
        patht[pn] = -3;
        pn++;
        patht[pn] = mt;
        pathf[pn] = d - 25;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
    }

    dancer[i].pn = pn + 1;
}

function passthrough(i, mw, opts) {
    // mw is 2
    // "p" to progress
    // "q" start facing up/down progress (circle 3/4 passthrough)
    // "u" end facing up and down
    // "i" end in
    // "s" end ready for star left
    // "r" end ready for star right
    // "l" ladies???
    // "2" 2 beats
    // "6" 3 beats
    // "3","4","5" end distance 30,40,50
    var e, s, pn, u, v, os, or, op, oi, ou, oq;

    os = (opts.indexOf("s") >= 0);
    or = (opts.indexOf("r") >= 0);
    op = (opts.indexOf("p") >= 0);
    ou = (opts.indexOf("u") >= 0);
    oi = (opts.indexOf("i") >= 0);
    oq = (opts.indexOf("q") >= 0);

    e = 50;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;
    if (opts.indexOf("5") >= 0) e = 50;
    if (op) e = 50;
    if (oq) e = 50;
    if (os) e = 40;
    if (or) e = 40;

    t = 4;
    if (opts.indexOf("2") >= 0) t = 2;
    if (opts.indexOf("6") >= 0) t = 3;

    if (opts.indexOf("l") >= 0) {
        v = woman;
        findset(i, "l");
    } else {
        v = man;
        findset(i, "r");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    u = Math.round(t * 5);
    s = Math.round(dis(i, dancer[i].p) / 2);
    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == v) {
        pn++;
        patht[pn] = u;
        pathf[pn] = 50;
        paths[pn] = -75 + s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 15;
        pn++;
        patht[pn] = t * 10 - u;
        pathf[pn] = 100;
        paths[pn] = -e + s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 15;
        if (oi) patha[pn] = -180;
        if (op) patha[pn] = -270;
        if (ou) patha[pn] = -90;
        if (os) patha[pn] = 180;
        if (or) patha[pn] = -270;
    }
    else {
        pn++;
        patht[pn] = u;
        pathf[pn] = 50;
        paths[pn] = 25 - s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 15;
        pn++;
        patht[pn] = t * 10 - u;
        pathf[pn] = 100;
        paths[pn] = e - s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 15;
        if (oi) patha[pn] = -180;
        if (op) patha[pn] = -90;
        if (ou) patha[pn] = -270;
        if (os) patha[pn] = 90;
        if (or) patha[pn] = -180;
    }

    dancer[i].pn = pn + 1;
}

function chainleft(i, mw, opts) {
    chain(i, mw, opts + "l");
}
function chainright(i, mw, opts) {
    chain(i, mw, opts + "m");
}
function chain(i, mw, opts) {
    // "w" to twirl ladies
    // "q" men chain
    // "l" chain on the left diagonal
    // "m" chain on the right diagonal
    // "3","4" end distance 30,40
    // end directions "a","d","e","s","r","n","t","u","p","y","x"
    var a2, e, s, pn, od, ol, om, j, oe, pc, lr, ox, oq, mn, wn;

    oq = opts.indexOf("q") >= 0;
    ol = opts.indexOf("l") >= 0;
    om = opts.indexOf("m") >= 0;
    od = opts.indexOf("d") >= 0;
    oe = opts.indexOf("e") >= 0;
    ox = opts.indexOf("x") >= 0;

    e = 50;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;
    if (opts.indexOf("p") >= 0) e = 50;
    if (opts.indexOf("n") >= 0) e = 50;
    if (opts.indexOf("t") >= 0) e = 50;

    opts2 = opts;
    if (whichdir(opts2) == "") opts2 += "a";

    if (oq) {
        mn = woman;
        wn = man;
    } else {
        mn = man;
        wn = woman;
    }

    pc = false;
    lr = false;
    if (ol || om) {
        findset(i, "c");
        if (dancer[i].p < 0) {
            pc = true;
            findset(i, "d");
            if (dancer[i].p < 0) findset(i, "e");
        }
        else if (ol && oe && (dancer[i].s == mn)) {
            lr = true;
            if (dancer[i].y > 0) {
                for (j = 0; j <= topdancer; j++) if (dancer[j].x > (dancer[i].x + 75)) lr = false;
            }
            else {
                for (j = 0; j <= topdancer; j++) if (dancer[j].x < (dancer[i].x - 75)) lr = false;
            }
        }
        else if (ol && oe && (dancer[i].s == wn)) {
            lr = true;
            if (dancer[i].y > 0) {
                for (j = 0; j <= topdancer; j++) if ((dancer[j].y > 0) && (dancer[j].x < (dancer[i].x - 50))) lr = false;
            }
            else {
                for (j = 0; j <= topdancer; j++) if ((dancer[j].y < 0) && (dancer[j].x > (dancer[i].x + 50))) lr = false;
            }
        }
        else if (om && ox && (dancer[i].s == mn)) {
            if (dancer[i].y > 0) {
                for (j = 0; j <= topdancer; j++) if ((dancer[j].x < (dancer[i].x - 10))) ox = false;
            }
            else {
                for (j = 0; j <= topdancer; j++) if ((dancer[j].x > (dancer[i].x + 10))) ox = false;
            }
        }
        else if (om && ox && (dancer[i].s == wn)) {
            if (dancer[i].y > 0) {
                for (j = 0; j <= topdancer; j++) if ((dancer[j].y > 0) && (dancer[j].x > (dancer[i].x + 10))) ox = false;
            }
            else {
                for (j = 0; j <= topdancer; j++) if ((dancer[j].y < 0) && (dancer[j].x < (dancer[i].x - 10))) ox = false;
            }
        }
        else ox = false;
    }
    else {
        if (oq) findset(i, "l"); else findset(i, "r");
        if (dancer[i].p < 0) {
            atend(i, mw, 8);
            return;
        }
    }
    dancer[i].e = false;

    q1 = whichquad(i, 0);
    q2 = q1;
    if (!pc) {
        if (q1 == 1) q2 = 3; else if (q1 == 3) q2 = 1;
    }
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    // turn off od or oe if there will not be a couple to dance with after the chain
    if ((!od) && (!oe));
    else if (((!ol) && (!om)) || pc || (q1 == 0) || (q1 == 2)) { // chain straight across, passive couple, or men
        if (od) od = odset(i, q1, q2);
        if (oe) oe = oeset(i, q1, q2);
    }
    else if (ol && od); // chain left to left diagonal
    else if (om && oe); // chain right to right diagonal
    else if (ol && oe) { // chain left to right diagonal
        oe = false;
        if (dancer[i].y < 0) {
            for (j = 0; j <= topdancer; j++) if (dancer[j].x > (dancer[i].x + 260)) oe = true;
        }
        else {
            for (j = 0; j <= topdancer; j++) if (dancer[j].x < (dancer[i].x - 260)) oe = true;
        }
    }
    // this code does not handle chain right to left diagonal

    s = Math.round(dis(i, dancer[i].p) / 2);
    pn = dancer[i].pn;
    patht[pn] = -3;

    if (pc) { // passive couple
        pn++;
        patht[pn] = 60;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 0;
        paths[pn] = s - e;
        patha[pn] = normalangle(a2 - dancer[i].a, 0);
        pathb[pn] = 0;
        if (dancer[i].s == wn) paths[pn] *= -1;
        if (oq && od) pathf[pn] += 80000;
        else if (od) pathf[pn] += 30000;
        else if (oe) pathf[pn] += 40000;
    }
    else if (lr && (dancer[i].s == mn)) { // chain left to right diagonal at the end man
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = -45;

        pn++;
        patht[pn] = 40;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = -45;
        pathb[pn] = 0;

        pn++;
        patht[pn] = 40;
        pathf[pn] = 150;
        paths[pn] = 50;
        patha[pn] = 40000 + 135;
        pathb[pn] = 0;
    }
    else if (om && ox && (dancer[i].s == mn)) {
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = 45;
        pn++;
        patht[pn] = 40;
        pathf[pn] = 100;
        paths[pn] = 50;
        patha[pn] = 20000 - 135;
        pathb[pn] = 10000 - 45;
        pn++;
        patht[pn] = 40;
        pathf[pn] = 100;
        paths[pn] = 50;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else if (om && ox && (dancer[i].s == wn)) {
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = -45;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50 - 25 / r2;
        paths[pn] = -100 - 25 / r2;
        patha[pn] = 0;
        pathb[pn] = 10000 - 20;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 150 - e;
        paths[pn] = -150;
        patha[pn] = -135;
        pathb[pn] = 10000 - 20;
        pn++;
        patht[pn] = 40;
        pathf[pn] = 150 - e;
        paths[pn] = -150;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else if (lr && (dancer[i].s == wn)) { // chain left to right diagonal at the end woman
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = -45;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50 - 25 / r2;
        paths[pn] = -100 - 25 / r2;
        patha[pn] = 0;
        pathb[pn] = 10000 - 20;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 125 - 30 / r2;
        paths[pn] = -175 + 30 / r2;
        patha[pn] = -90;
        pathb[pn] = 10000 - 20;

        pn++;
        patht[pn] = 40;
        pathf[pn] = -50;
        paths[pn] = -150;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else if (ol && (dancer[i].s == mn)) { // chain left man
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = -45;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 25 - 30 / r2;
        paths[pn] = 25 + 30 / r2;
        patha[pn] = 0;
        pathb[pn] = 10000 + 40;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 25 - 30 / r2;
        paths[pn] = 25 + 30 / r2;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 25 - 30 / r2;
        paths[pn] = 25 + 30 / r2;
        patha[pn] = 90;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 15;
        pathf[pn] = 25;
        paths[pn] = 25;
        patha[pn] = 135;
        pathb[pn] = 135;
        pn++;
        patht[pn] = 25;
        pathf[pn] = 50;
        paths[pn] = 50 - e;
        patha[pn] = normalangle(a2 - (dancer[i].a + 90 + 135), 0);
        pathb[pn] = 10000 + 40;
        if (oq && od) pathf[pn] += 80000;
        else if (od) pathf[pn] += 30000;
        else if (oe) {
            pathf[pn] += 40000;
            patht[pn] -= 10;
            patht[pn - 1] += 10;
        }
    }
    else if (ol) { // chain left woman
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = -45;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50 - 25 / r2;
        paths[pn] = -100 - 25 / r2;
        patha[pn] = 0;
        pathb[pn] = 10000 - 20;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 125 - 30 / r2;
        paths[pn] = -175 + 30 / r2;
        patha[pn] = -90;
        pathb[pn] = 10000 - 20;
        pn++;
        patht[pn] = 15;
        pathf[pn] = 125;
        paths[pn] = -175;
        patha[pn] = 135;
        pathb[pn] = 135;
        pn++;
        patht[pn] = 25;
        pathf[pn] = 100;
        paths[pn] = -200 - e;
        patha[pn] = normalangle(a2 - (dancer[i].a - 90 + 135), -269);
        pathb[pn] = 10000 + 40;
        if (oq && od) pathf[pn] += 80000;
        else if (od) pathf[pn] += 30000;
        else if (oe) {
            pathf[pn] += 40000;
            patht[pn] -= 10;
            patht[pn - 1] += 10;
        }
        if (opts.indexOf("w") >= 0) patha[pn] += 360;
    }
    else if (om && (dancer[i].s == mn)) { // chain right man
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = -45;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 25 - 30 / r2;
        paths[pn] = 25 + 30 / r2;
        patha[pn] = 0;
        pathb[pn] = 10000 + 40;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 25 - 30 / r2;
        paths[pn] = 25 + 30 / r2;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 25 - 30 / r2;
        paths[pn] = 25 + 30 / r2;
        patha[pn] = 90;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 25;
        pathf[pn] = 25;
        paths[pn] = 25;
        patha[pn] = 225;
        pathb[pn] = 225;
        pn++;
        patht[pn] = 15;
        pathf[pn] = -e;
        paths[pn] = 0;
        patha[pn] = normalangle(a2 - (dancer[i].a + 90 + 225), 0);
        pathb[pn] = 10000 + 40;
        if (oq && od) pathf[pn] += 80000;
        else if (od) pathf[pn] += 30000;
        else if (oe) {
            pathf[pn] += 40000;
            patht[pn] -= 5;
            patht[pn - 1] += 5;
        }
    }
    else if (om) { // chain right woman
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = -45;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50 - 25 / r2;
        paths[pn] = -100 - 25 / r2;
        patha[pn] = 0;
        pathb[pn] = 10000 - 20;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 125 - 30 / r2;
        paths[pn] = -175 + 30 / r2;
        patha[pn] = -90;
        pathb[pn] = 10000 - 20;
        pn++;
        patht[pn] = 25;
        pathf[pn] = 125;
        paths[pn] = -175;
        patha[pn] = 225;
        pathb[pn] = 225;
        pn++;
        patht[pn] = 15;
        pathf[pn] = 150 - e;
        paths[pn] = -150;
        patha[pn] = normalangle(a2 - (dancer[i].a - 90 + 225), -269);
        pathb[pn] = 10000 + 40;
        if (oq && od) pathf[pn] += 80000;
        else if (od) pathf[pn] += 30000;
        else if (oe) {
            pathf[pn] += 40000;
            patht[pn] -= 5;
            patht[pn - 1] += 5;
        }
        if (opts.indexOf("w") >= 0) patha[pn] += 360;
    }
    else if (dancer[i].s == mn) { // chain across man
        pn++;
        patht[pn] = 20;
        pathf[pn] = -50;
        paths[pn] = s;
        patha[pn] = 0;
        pathb[pn] = 10000 + 40;
        pn++;
        patht[pn] = 10;
        pathf[pn] = -50;
        paths[pn] = s;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = -50;
        paths[pn] = s;
        patha[pn] = 90;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 25;
        pathf[pn] = -20;
        paths[pn] = s;
        patha[pn] = 180;
        pathb[pn] = 180;
        pn++;
        patht[pn] = 15;
        pathf[pn] = 0;
        paths[pn] = s - e;
        patha[pn] = normalangle(a2 - (dancer[i].a + 90 + 180), 0);
        pathb[pn] = 10000 + 40;
        if (oq && od) pathf[pn] += 80000;
        else if (od) pathf[pn] += 30000;
        else if (oe) {
            pathf[pn] += 40000;
            patht[pn] -= 5;
            patht[pn - 1] += 5;
        }
    }
    else { // chain across woman
        pn++;
        patht[pn] = 10;
        pathf[pn] = 10;
        paths[pn] = -s;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 30;
        pathf[pn] = 90;
        paths[pn] = -s;
        patha[pn] = -90;
        pathb[pn] = 10000 - 55;
        pn++;
        patht[pn] = 25;
        pathf[pn] = 120;
        paths[pn] = -s;
        patha[pn] = 180;
        pathb[pn] = 180;
        pn++;
        patht[pn] = 15;
        pathf[pn] = 100;
        paths[pn] = -s - e;
        patha[pn] = normalangle(a2 - (dancer[i].a - 90 + 180), -269);
        pathb[pn] = 10000 + 40;
        if (oq && od) pathf[pn] += 80000;
        else if (od) pathf[pn] += 30000;
        else if (oe) {
            pathf[pn] += 40000;
            patht[pn] -= 5;
            patht[pn - 1] += 5;
        }
        if (opts.indexOf("w") >= 0) patha[pn] -= 360;
    }

    dancer[i].pn = pn + 1;
}

function petronella(i, mw, opts) {
    // mw is 2
    // "l" starts with lady on the left
    // end directions "a","d","e","s","r","n","t","u","p","y"
    // "v" turn long waves
    var ol, opts2, q1, q2, a2, pn, od, oe;

    ol = opts.indexOf("l") >= 0;

    if (ol) findset(i, "l"); else findset(i, "r");
    if (dancer[i].p < 0) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if (whichdir(opts2) == "") opts2 += "a";

    q1 = whichquad(i, 0);
    q2 = whichquad(i, 90);
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    if (opts.indexOf("d") < 0) od = false; else od = odset(i, q1, q2);
    if (opts.indexOf("e") < 0) oe = false; else oe = oeset(i, q1, q2);

    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 10;
    pathf[pn] = 25;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pathr[pn] = "p1";
    pn++;
    patht[pn] = 10;
    pathf[pn] = 25;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pathr[pn] = "p1";
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pathr[pn] = "p2";
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pathr[pn] = "p2";

    if (((dancer[i].s == man) && (!ol)) || ((dancer[i].s == woman) && (ol))) {
        pn++;
        patht[pn] = 40;
        pathf[pn] = 0;
        paths[pn] = 100;
        patha[pn] = normalangle(a2 - dancer[i].a, -539);
        pathb[pn] = 0;
        if (opts.indexOf("v") >= 0) pathf[pn] -= 17;
        if (od) pathf[pn] += 30000;
        else if (oe) pathf[pn] += 40000;
    }
    else {
        pathr[pn - 3] = "p3";
        pathr[pn - 2] = "p3";
        pathr[pn - 1] = "p4";
        pathr[pn] = "p4";
        pn++;
        patht[pn] = 40;
        pathf[pn] = 100;
        paths[pn] = 0;
        patha[pn] = normalangle(a2 - dancer[i].a, -539);
        pathb[pn] = 0;
        if (opts.indexOf("v") >= 0) {
            pathf[pn] -= 17;
            patha[pn] -= 180;
        }
        if (od) pathf[pn] += 30000;
        else if (oe) pathf[pn] += 40000;
    }

    dancer[i].pn = pn + 1;
}

function downthehall(i, mw, opts) {
    // mw is 2
    var pn, ol, oe;

    ol = opts.indexOf("l") >= 0;

    oe = false;
    if (ol) findset(i, "e"); else findset(i, "d");

    if ((dancer[i].x < -400) && (sign(dancer[i].y) != sign(dancer[dancer[i].p].y))) oe = true;
    else if ((dancer[i].p < 0) || (sign(dancer[i].y) != sign(dancer[dancer[i].p].y))) {
        atend(i, mw, 16);
        return;
    }
    dancer[i].e = false;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (oe) {
        pn++;
        patht[pn] = 80;
        pathf[pn] = -100;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 80;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        dancer[i].pn = pn + 1;
        return;
    }

    if ((dancer[i].s == man) != ol) {
        pn++;
        patht[pn] = 60;
        pathf[pn] = 150;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 150;
        paths[pn] = 75;
        patha[pn] = 180;
        pathb[pn] = 10000 + 75;
        pn++;
        patht[pn] = 60;
        pathf[pn] = 0;
        paths[pn] = 75;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else {
        pn++;
        patht[pn] = 60;
        pathf[pn] = 150;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 150;
        paths[pn] = -75;
        patha[pn] = 180;
        pathb[pn] = 10000 + 75;
        pn++;
        patht[pn] = 60;
        pathf[pn] = 0;
        paths[pn] = -75;
        patha[pn] = 0;
        pathb[pn] = 0;
    }

    if (((dancer[i].s == man) != ol) && (dancer[i].y < 0)) {
        pn++;
        patht[pn] = 20;
        pathf[pn] = -50;
        paths[pn] = 12.5;
        patha[pn] = -90;
        pathb[pn] = 10000 - 60;
    }
    else if ((dancer[i].s == man) != ol) {
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50;
        paths[pn] = 62.5;
        patha[pn] = 90;
        pathb[pn] = 10000 + 30;
    }
    else if (dancer[i].y < 0) {
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50;
        paths[pn] = -62.5;
        patha[pn] = -90;
        pathb[pn] = 10000 + 30;
    }
    else {
        pn++;
        patht[pn] = 20;
        pathf[pn] = -50;
        paths[pn] = -12.5;
        patha[pn] = 90;
        pathb[pn] = 10000 + 60;
    }

    dancer[i].pn = pn + 1;
}

function promenade(i, mw, opts) {
    // "3","4" end distance 30,40
    // "q" progress via slide right
    var opts2, q1, q2, a2, e, s, pn, od, oe, oq;

    oq = opts.indexOf("q") >= 0;

    e = 50;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;
    if (opts.indexOf("p") >= 0) e = 50;
    if (opts.indexOf("n") >= 0) e = 50;
    if (opts.indexOf("t") >= 0) e = 50;

    if (opts.indexOf("l") >= 0) findset(i, "l"); else findset(i, "r");
    if (dancer[i].p < 0) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if (whichdir(opts2) == "") opts2 += "a";

    q1 = whichquad(i, 0);
    q2 = whichquad(i, 180);
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    if (opts.indexOf("d") < 0) od = false; else od = odset(i, q1, q2);
    if (opts.indexOf("e") < 0) oe = false; else oe = oeset(i, q1, q2);

    s = Math.round(dis(i, dancer[i].p) / 2);
    pn = dancer[i].pn;
    patht[pn] = -3;

    if ((q1 == 0) || (q1 == 2)) {
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50;
        paths[pn] = 25 + s;
        patha[pn] = 0;
        pathb[pn] = 10000 + 15;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 110;
        paths[pn] = s - 30;
        patha[pn] = 0;
        pathb[pn] = 10000 + 15;
        if (oq) paths[pn] -= 25;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 110;
        paths[pn] = s;
        patha[pn] = 90;
        pathb[pn] = 90;
        if (oq) paths[pn] -= 50;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 100;
        paths[pn] = s + e;
        patha[pn] = normalangle(a2 - (dancer[i].a + 90), 0);
        pathb[pn] = 10000 + 40;
        if (oq) paths[pn] -= 100;
        if (od) pathf[pn] += 30000;
        else if (oe) pathf[pn] += 40000;
    }
    else {
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50;
        paths[pn] = 75 - s;
        patha[pn] = 0;
        pathb[pn] = 10000 + 15;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 110;
        paths[pn] = 30 - s;
        patha[pn] = 0;
        pathb[pn] = 10000 + 15;
        if (oq) paths[pn] -= 25;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 110;
        paths[pn] = -s;
        patha[pn] = 90;
        pathb[pn] = 90;
        if (oq) paths[pn] -= 50;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 100;
        paths[pn] = -s - e;
        patha[pn] = normalangle(a2 - (dancer[i].a + 90), 0);
        pathb[pn] = 10000 + 40;
        if (oq) paths[pn] -= 100;
        if (od) pathf[pn] += 30000;
        else if (oe) pathf[pn] += 40000;
        if (opts.indexOf("t") >= 0) patha[pn] += 360;
    }

    dancer[i].pn = pn + 1;
}

function sign(a) {
    if (a == 0) return 0; else if (a > 0) return 1; else return -1;
}

function rightandleftthrough(i, mw, opts) {
    // mw is 2
    // "l" starts with lady on the left
    // "w" to twirl ladies
    // end directions "a","d","e","s","r","n","t","u","p","y"
    // "3","4" end distance 30,40
    var opts2, q1, q2, a2, e, s, pn, od, oe;

    e = 50;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;
    if (opts.indexOf("p") >= 0) e = 50;
    if (opts.indexOf("n") >= 0) e = 50;
    if (opts.indexOf("t") >= 0) e = 50;

    if (opts.indexOf("l") >= 0) findset(i, "l"); else findset(i, "r");
    if (dancer[i].p < 0) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if (whichdir(opts2) == "") opts2 += "a";

    q1 = whichquad(i, 0);
    q2 = whichquad(i, 180);
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    if (opts.indexOf("d") < 0) od = false; else od = odset(i, q1, q2);
    if (opts.indexOf("e") < 0) oe = false; else oe = oeset(i, q1, q2);

    s = Math.round(dis(i, dancer[i].p) / 2);
    pn = dancer[i].pn;
    patht[pn] = -3;

    if ((q1 == 0) || (q1 == 2)) {
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50;
        paths[pn] = -75 + s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 15;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 110;
        paths[pn] = -30 + s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 15;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 110;
        paths[pn] = s;
        patha[pn] = 90;
        pathb[pn] = 90;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 100;
        paths[pn] = s + e;
        patha[pn] = normalangle(a2 - (dancer[i].a + 90), 0);
        pathb[pn] = 10000 + 40;
        if (od) pathf[pn] += 30000;
        else if (oe) pathf[pn] += 40000;
    }
    else {
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50;
        paths[pn] = 25 - s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 15;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 110;
        paths[pn] = 30 - s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 15;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 110;
        paths[pn] = -s;
        patha[pn] = 90;
        pathb[pn] = 90;
        pn++;
        patht[pn] = 20;
        pathf[pn] = 100;
        paths[pn] = -s - e;
        patha[pn] = normalangle(a2 - (dancer[i].a + 90), -269);
        pathb[pn] = 10000 + 40;
        if (od) pathf[pn] += 30000;
        else if (oe) pathf[pn] += 40000;
        if (opts.indexOf("w") >= 0) patha[pn] -= 360;
    }

    dancer[i].pn = pn + 1;
}

function circleleft(i, mw, t, a, opts) {
    // mw is 2
    // t time
    // a angle, 180, 270, 360
    // "l" starts with lady on the left
    // end directions "a","d","e","s","r","n","t","u","p","y"
    // "v" end in wavy lines across

    var od, opts2, q1, q2, a2, mb, mt, pn;

    if (opts.indexOf("l") >= 0) findset(i, "l"); else findset(i, "r");
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if (whichdir(opts2) == "") opts2 += "u";

    q1 = whichquad(i, 0);
    q2 = whichquad(i, -a);
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    if (opts.indexOf("d") < 0) od = false; else od = odset(i, q1, q2);
    var oe;
    if (opts.indexOf("e") < 0) oe = false; else od = oeset(i, q1, q2);

    mt = Math.round(450 / a * t);
    mb = normalangle(q1 * 90 - 90 - dancer[i].a, -359);

    pn = dancer[i].pn;
    patht[pn] = -4;
    pathf[pn] = 0;
    paths[pn] = 0;
    pathb[pn] = mb;
    pn++;
    patht[pn] = mt;
    pathf[pn] = 50;
    paths[pn] = -50;
    patha[pn] = mb;
    pathb[pn] = -45;
    pathr[pn] = "ci";

    pn++;
    patht[pn] = -3;
    pn++;
    patht[pn] = t * 10 - mt * 2;
    pathf[pn] = 50 * r2;
    paths[pn] = 0;
    patha[pn] = 90 - a;
    pathb[pn] = 90 - a;
    pathr[pn] = "ci";

    pn++;
    patht[pn] = -3;
    pn++;
    patht[pn] = mt;
    pathf[pn] = 50 * r2 - 50;
    paths[pn] = -50;
    patha[pn] = normalangle(a2 - (dancer[i].a + mb + 90 - a), -359);
    pathb[pn] = 10000 - 20;
    // if (patha[pn]<-135) patha[pn]+=360;
    if (od) pathf[pn] += 30000;
    else if (oe) pathf[pn] += 40000;
    else if (opts.indexOf("v") >= 0) {
        if ((q2 == 1) || (q2 == 3)) {
            pathf[pn] = 50 * r2 - 17;
            paths[pn] = -112.5;
            patha[pn] = 0;
        }
        else {
            pathf[pn] = 50 * r2 - 37.5;
            paths[pn] = -17;
            patha[pn] = -90;
        }
    }
    else pathf[pn] += 10000;

    dancer[i].pn = pn + 1;
}

function circleright(i, mw, t, a, opts) {
    // mw is 2
    // t time
    // a angle, 180, 270, 360
    // "l" starts with lady on the left
    // "w" twirl out to allemande left progression
    // end directions "a","d","e","s","r","n","t","u","p","y"

    var opts2, q1, q2, a2, mb, mt, pn, od;

    if (opts.indexOf("l") >= 0) findset(i, "l"); else findset(i, "r");
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if (whichdir(opts2) == "") opts2 += "u";

    q1 = whichquad(i, 0);
    q2 = whichquad(i, a);
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    if (opts.indexOf("d") < 0) od = false; else od = odset(i, q1, q2);
    if (opts.indexOf("e") < 0) oe = false; else od = oeset(i, q1, q2);

    mt = Math.round(450 / a * t);
    mb = normalangle(q1 * 90 - dancer[i].a, 0);

    pn = dancer[i].pn;
    patht[pn] = -4;
    pathf[pn] = 0;
    paths[pn] = 0;
    pathb[pn] = mb;
    pn++;
    patht[pn] = mt;
    pathf[pn] = 50;
    paths[pn] = 50;
    patha[pn] = mb;
    pathb[pn] = 45;
    pathr[pn] = "ci";

    pn++;
    patht[pn] = -3;
    pn++;
    patht[pn] = t * 10 - mt * 2;
    pathf[pn] = 50 * r2;
    paths[pn] = 0;
    patha[pn] = a - 90;
    pathb[pn] = a - 90;
    pathr[pn] = "ci";

    pn++;
    patht[pn] = -3;
    pn++;
    patht[pn] = mt;
    pathf[pn] = 50 * r2 - 50;
    paths[pn] = 50;
    patha[pn] = normalangle(a2 - (dancer[i].a + mb + a - 90), -181);
    pathb[pn] = 10000 + 20;
    if (opts.indexOf("w") >= 0) patha[pn] += 360;
    if (od) pathf[pn] += 30000;
    else if (oe) pathf[pn] += 40000;
    else pathf[pn] += 10000;

    dancer[i].pn = pn + 1;
}

function starleft(i, mw, t, a, opts) {
    // mw is 2
    // t time
    // a angle, 180, 270, 360, 450
    // "l" starts with lady on the left
    // end directions "a","d","e","s","r","n","t","u","p","y"
    // "m" turn to allemande in the middle
    // "g" to a gypsy
    // "z" to a gypsy star
    // "h" hold the star
    // "v" to w wavy star

    var opts2, st, od, oe, oh, ov, q1, q2, a2, mt, mu, mb, e;

    oh = opts.indexOf("h") >= 0;
    ov = opts.indexOf("v") >= 0;

    st = false;
    findset(i, "o");
    if (dancer[i].p >= 0) st = true;
    else findset(i, "s");
    if (dancer[i].p < 0) findset(i, "u");
    if (dancer[i].p < 0) {
        if (opts.indexOf("l") >= 0) findset(i, "l"); else findset(i, "r");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if (opts.indexOf("z") < 0) e = 50; else {
        e = 25;
        opts2 += "a";
    }
    if (whichdir(opts2) == "") opts2 += "a";

    if (st) a += 45;

    if (st) {
        q1 = whichquadstar(i, 0);
        q2 = whichquadstar(i, a);
    }
    else {
        q1 = whichquad(i, 0);
        q2 = whichquad(i, a);
    }
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    if (opts.indexOf("d") < 0) od = false; else od = odset(i, q1, q2);
    if (opts.indexOf("e") < 0) oe = false; else oe = oeset(i, q1, q2);

    if (st) {
        mt = Math.round(450 / (a - 45) * t);
        mu = 1;
    }
    else if (opts.indexOf("g") >= 0) {
        mt = Math.round(450 / (a + 45) * t);
        mu = 3;
    }
    else if (oh) {
        mt = Math.round(450 / a * t);
        mu = 1;
    }
    else {
        mt = Math.round(450 / a * t);
        mu = 2;
    }
    mb = normalangle(q1 * 90 - 90 - dancer[i].a, -180);

    pn = dancer[i].pn;
    if (!st) {
        patht[pn] = -4;
        pathf[pn] = 0;
        paths[pn] = 0;
        pathb[pn] = mb;

        pn++;
        patht[pn] = mt;
        pathf[pn] = 50000 + 50;
        paths[pn] = 0;
        patha[pn] = mb;
        pathb[pn] = 10000 + 20;
        pathr[pn] = "sl";

        pn++;
    }
    patht[pn] = -3;

    pn++;
    patht[pn] = t * 10 - mt * mu;
    pathf[pn] = 0;
    paths[pn] = -50;
    patha[pn] = a - 90;
    pathb[pn] = a - 90;
    pathr[pn] = "sl";

    if (oh) {
        patha[pn] = a - 45;
        pathb[pn] = a - 45;
        dancer[i].pn = pn + 1;
        return;
    }

    pn++;
    patht[pn] = -3;

    if ((q2 == 0) || (q2 == 2)) {
        pn++;
        patht[pn] = mt;
        pathf[pn] = e;
        paths[pn] = 0;
        patha[pn] = normalangle(a2 - (dancer[i].a + mb + a - 90), 0);
        pathb[pn] = 0;
    }
    else {
        pn++;
        patht[pn] = mt;
        pathf[pn] = 50;
        paths[pn] = e - 50;
        patha[pn] = normalangle(a2 - (dancer[i].a + mb + a - 90), 0);
        pathb[pn] = 0;
    }
    if (od) pathf[pn] += 30000;
    else if (oe) pathf[pn] += 40000;
    else if (ov) {
        patht[pn - 1] = -4;
        pathf[pn - 1] = 0;
        paths[pn - 1] = 0;
        pathb[pn - 1] = 45;
        pathf[pn] = 25 * r2 - 17;
        paths[pn] = 25 / r2;
        patha[pn] = 45;
        pathb[pn] = 10000 + 30;
    }

    if (((q2 == 0) || (q2 == 2)) && (opts.indexOf("g") >= 0)) {
        patht[pn] = mt * 2;
        pathf[pn] = 50;
        paths[pn] = -50;
        patha[pn] = 0;
        pathb[pn] = 10000 + 45;
    }
    if (((q2 == 1) || (q2 == 3)) && (opts.indexOf("g") >= 0)) {
        patht[pn] = mt * 2;
        pathf[pn] = 0;
        paths[pn] = 25;
        patha[pn] = -270;
        pathb[pn] = -180;
    }
    if (((q2 == 0) || (q2 == 2)) && (opts.indexOf("m") >= 0)) {
        pathf[pn] = 30;
        paths[pn] = -50;
        patha[pn] = 90;
        pathb[pn] = 10000 + 45;
    }

    dancer[i].pn = pn + 1;
}

function starright(i, mw, t, a, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // t time
    // a angle, 180, 270, 360, 450
    // "l" starts with lady on the left
    // end directions "a","d","e","s","r","n","t","u","p","y"
    // "m" turn to allemande in the middle
    // "v" end in long wavy lines
    // "w" end in wavy lines across
    // "c" setup for ladies chain
    // "h" hold the star
    var u, opts2, oh, q1, q2, a2, od, oe, mt, mu, mb, ow, ov;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    oh = opts.indexOf("h") >= 0;
    ov = opts.indexOf("v") >= 0;
    ow = opts.indexOf("w") >= 0;

    findset(i, "t");
    if (dancer[i].p < 0) findset(i, "v");
    if (dancer[i].p < 0) {
        if (opts.indexOf("l") >= 0) findset(i, "l"); else findset(i, "r");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if (whichdir(opts2) == "") opts2 += "a";

    q1 = whichquad(i, 0);
    q2 = whichquad(i, -a);
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    if (opts.indexOf("d") < 0) od = false; else od = odset(i, q1, q2);
    if (opts.indexOf("e") < 0) oe = false; else od = oeset(i, q1, q2);

    mt = Math.round(450 / a * t);
    if (oh) mu = 0; else if (ow) mu = mt + 5; else mu = mt;
    mb = normalangle(q1 * 90 - dancer[i].a, -179);

    pn = dancer[i].pn;
    patht[pn] = -4;
    pathf[pn] = 0;
    paths[pn] = 0;
    pathb[pn] = mb;

    pn++;
    patht[pn] = mt;
    pathf[pn] = 50000 + 50;
    paths[pn] = 0;
    patha[pn] = mb;
    pathb[pn] = 10000 - 20;
    pathr[pn] = "sr";

    pn++;
    patht[pn] = -3;

    pn++;
    patht[pn] = t * 10 - mt - mu;
    pathf[pn] = 0;
    paths[pn] = 50;
    patha[pn] = 90 - a;
    pathb[pn] = 90 - a;
    pathr[pn] = "sr";

    if (oh) {
        patha[pn] = 45 - a;
        pathb[pn] = 45 - a;
        dancer[i].pn = pn + 1;
        return;
    }

    pn++;
    patht[pn] = -3;

    pn++;
    patht[pn] = mu;
    pathf[pn] = 50;
    paths[pn] = 0;
    patha[pn] = normalangle(a2 - (dancer[i].a + mb + 90 - a), -359);
    pathb[pn] = 0;
    if (od) pathf[pn] += 30000;
    else if (oe) pathf[pn] += 40000;

    if (((q2 == 1) || (q2 == 3)) && (opts.indexOf("m") >= 0)) {
        pathf[pn] = 30;
        paths[pn] = 50;
        patha[pn] = -90;
        pathb[pn] = 10000 - 45;
    }

    if (((q2 == 0) || (q2 == 2)) && (opts.indexOf("c") >= 0)) {
        patht[pn] = 10;
        pathf[pn] = 40;
        paths[pn] = 0;
        patha[pn] = 270;
        pathb[pn] = 0;
    }
    if (((q2 == 1) || (q2 == 3)) && (opts.indexOf("c") >= 0)) {
        patht[pn] = 10;
        pathf[pn] = 50;
        paths[pn] = 10;
        patha[pn] = -180;
        pathb[pn] = 10000 - 30;
    }

    if (((q2 == 0) || (q2 == 2)) && (opts.indexOf("v") >= 0)) {
        paths[pn] = -17;
        patha[pn] = -90;
    }
    if (((q2 == 1) || (q2 == 3)) && (opts.indexOf("v") >= 0)) {
        pathf[pn] = 33;
        patha[pn] = 0;
    }

    if (((q2 == 0) || (q2 == 2)) && (opts.indexOf("w") >= 0)) {
        pathf[pn] = 17;
        paths[pn] = 12.5;
        patha[pn] = -180;
        pathb[pn] = 10000 - 45;
    }
    if (((q2 == 1) || (q2 == 3)) && (opts.indexOf("w") >= 0)) {
        pathf[pn] = 112.5;
        paths[pn] = 33;
        patha[pn] = -90;
        pathb[pn] = 10000 - 15;
    }

    dancer[i].pn = pn + 1;
}

function heypassleft(i, mw, opts) {
    hey1(i, mw, opts + "x");
}
function heypassright(i, mw, opts) {
    hey1(i, mw, opts);
}
function hey1(i, mw, opts) {
    // mw is 2
    // "x" pass left
    // "l" lady on the left
    // "f" full hey
    // "g" gypsy hey
    // "h" push off hey
    // "i" push off hey, first person pushes
    // "b" end facing in/out ready for balance and swing
    // "2","3","4" end distance 20,30,40
    // "v" end in long wavy lines
    // end directions "a","d","e","s","r","n","t","u","p","y"
    //bill note tn is local here but global in the rest of program!
    var ox, e, og, md, b, s, a, t, pn, ol, ov, ob, of, oh, oi, tc, tn, ts, tx, lr;

    ov = opts.indexOf("v") >= 0;
    of = opts.indexOf("f") >= 0;
    og = opts.indexOf("g") >= 0;
    oh = opts.indexOf("h") >= 0;
    oi = opts.indexOf("i") >= 0;
    ob = opts.indexOf("b") >= 0;
    ol = opts.indexOf("l") >= 0;
    ox = opts.indexOf("x") >= 0;

    e = 50;
    if (opts.indexOf("2") >= 0) e = 20;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;
    if (opts.indexOf("p") >= 0) e = 50;
    if (opts.indexOf("n") >= 0) e = 50;
    if (opts.indexOf("t") >= 0) e = 50;
    if (ov) e = 50;

    if (ox) lr = -1; else lr = 1;

    if (of) t = 16; else t = 8;

    a = false;
    if (ox && ol) findset(i, "k");
    else if (ox) findset(i, "i");
    else findset(i, "h");
    if (dancer[i].p >= 0) a = true; // from an allemande
    else if (ol) findset(i, "l");
    else findset(i, "r");
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if ((whichdir(opts2) == "") || ob) opts2 += "a";

    q1 = whichquad(i, 0);
    if ((oh || oi) && of) q2 = whichquad(i, 180);
    else if (oh && !ox) {
        if ((q1 == 1) || (q1 == 3)) {
            q2 = whichquad(i, 180);
            oh = false;
        } else q2 = q1;
    }
    else if (oh) {
        if ((q1 == 0) || (q1 == 2)) {
            q2 = whichquad(i, 180);
            oh = false;
        } else q2 = q1;
    }
    else if (oi && !ox) {
        if ((q1 == 0) || (q1 == 2)) {
            q2 = whichquad(i, 180);
            oi = false;
        } else q2 = q1;
    }
    else if (oi) {
        if ((q1 == 1) || (q1 == 3)) {
            q2 = whichquad(i, 180);
            oi = false;
        } else q2 = q1;
    }
    else {
        if (of) q2 = q1; else q2 = whichquad(i, 180);
    }
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    s = Math.round(dis(i, dancer[i].p) / 2);

    pn = dancer[i].pn;
    patht[pn] = -3;
    b = 0;

    if (xor(ox, (q1 == 0) || (q1 == 2))) {
        tn = 9;
        ts = 14;
        tx = ts * 2 - tn;
        tc = 80 - ts * 4; // tn - entry, ts - one segment, tx - exit, tc - endcap

        if (ob) a2 += 180;

        if (a) {
            pn++;
            patht[pn] = tn;
            pathf[pn] = 50;
            paths[pn] = (30 - s) * lr;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = tc;
            pathf[pn] = 50;
            paths[pn] = -s * lr;
            patha[pn] = 180;
            pathb[pn] = 180 * lr;
            b += 180 * lr;
        } else {
            pn++;
            patht[pn] = tn;
            pathf[pn] = -50;
            paths[pn] = (s - 30) * lr;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = tc;
            pathf[pn] = -50;
            paths[pn] = s * lr;
            patha[pn] = 0;
            pathb[pn] = 180 * lr;
        }

        if (!of);
        else if (oh || oi) {
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = ts * 2;
            pathf[pn] = 80;
            paths[pn] = -30 * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = ts * 2;
            pathf[pn] = 0;
            paths[pn] = -60 * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = tc;
            pathf[pn] = 0;
            paths[pn] = -30 * lr;
            patha[pn] = 0;
            pathb[pn] = 180 * lr;
        }
        else {
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 50;
            paths[pn] = -30 * lr;
            patha[pn] = og ? 0 : 40 * lr;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 100;
            paths[pn] = -60 * lr;
            patha[pn] = og ? 0 : -40 * lr;
            pathb[pn] = 10000 - 30 * lr;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 150;
            paths[pn] = -30 * lr;
            patha[pn] = og ? 0 : -40 * lr;
            pathb[pn] = 10000 - 30 * lr;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 200;
            paths[pn] = 0 * lr;
            patha[pn] = og ? 180 * lr : 40 * lr;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = tc;
            pathf[pn] = 200;
            paths[pn] = -30 * lr;
            patha[pn] = og ? 0 : 180 * lr;
            pathb[pn] = 180 * lr;
            b += 180 * lr;
        }

        pn++;
        patht[pn] = -3;

        if (oh && !of) {
            pn++;
            patht[pn] = ts * 2;
            pathf[pn] = 80;
            paths[pn] = -30 * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 + 30 * lr;
            if (!ob) {
                pn++;
                patht[pn] = tx;
                pathf[pn] = 50;
                paths[pn] = (-e - 30) * lr;
                patha[pn] = normalangle(a2 - (dancer[i].a + b), 0);
                pathb[pn] = 10000 + 15 * lr;
            }
            else {
                pn++;
                patht[pn] = tx;
                pathf[pn] = 70;
                paths[pn] = -30 * lr;
                patha[pn] = normalangle(a2 - (dancer[i].a + b), 0) - 360;
                pathb[pn] = 0;
            }
        }
        else {
            pn++;
            patht[pn] = ts;
            pathf[pn] = 50;
            paths[pn] = -30 * lr;
            patha[pn] = og ? 0 : 40 * lr;
            pathb[pn] = 10000 + 30 * lr;
            b += patha[pn];
            pn++;
            patht[pn] = ts;
            pathf[pn] = 100;
            paths[pn] = -60 * lr;
            patha[pn] = og ? 0 : -40 * lr;
            pathb[pn] = 10000 - 30 * lr;
            b += patha[pn];
            if (ov) {
                pn++;
                patht[pn] = tx;
                pathf[pn] = 150 - 17;
                paths[pn] = (e - 30) * lr;
                patha[pn] = 0;
                pathb[pn] = 10000 - 45 * lr;
            }
            else if (!ob) {
                pn++;
                patht[pn] = tx;
                pathf[pn] = 150;
                paths[pn] = (e - 30) * lr;
                patha[pn] = normalangle(a2 - (dancer[i].a + b), 0);
                pathb[pn] = 10000 - 45 * lr;
            }
            else if (og) {
                pn++;
                patht[pn] = tx;
                pathf[pn] = 130;
                paths[pn] = -30 * lr;
                patha[pn] = normalangle(a2 - (dancer[i].a + b), 0);
                pathb[pn] = 10000 - 60 * lr;
            }
            else {
                pn++;
                patht[pn] = tx;
                pathf[pn] = 130;
                paths[pn] = -30 * lr;
                patha[pn] = normalangle(a2 - (dancer[i].a + b), 0) - 360;
                pathb[pn] = 10000 - 60 * lr;
            }
        }


    }
    else {
        tn = 21;
        ts = 14;
        tx = ts * 2 - tn;
        tc = 80 - ts * 4; // tn - entry, ts - one segment, tx - exit, tc - endcap

        if (oi) {
            pn++;
            patht[pn] = tn;
            pathf[pn] = 30;
            paths[pn] = -s * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 + 45 * lr;
            pn++;
            patht[pn] = 2 * ts;
            pathf[pn] = -50;
            paths[pn] = (-s - 30) * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = tc;
            pathf[pn] = -50;
            paths[pn] = -s * lr;
            patha[pn] = 0;
            pathb[pn] = 180 * lr;
        }
        else {
            pn++;
            patht[pn] = tn;
            pathf[pn] = 50;
            paths[pn] = (-s - 30) * lr;
            patha[pn] = og ? 180 * lr : 0;
            pathb[pn] = 10000 - 45 * lr;

            pn++;
            patht[pn] = -4;
            pathf[pn] = 0;
            paths[pn] = 0;
            pathb[pn] = og ? 180 * lr : 0;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 50;
            paths[pn] = 30 * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 - 30 * lr;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 100;
            paths[pn] = 60 * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = tc;
            pathf[pn] = 100;
            paths[pn] = 30 * lr;
            patha[pn] = og ? 0 : 180 * lr;
            pathb[pn] = 180 * lr;
            b += 180 * lr;
        }

        if (!of);
        else if (oh) {
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = ts * 2;
            pathf[pn] = 80;
            paths[pn] = -30 * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = ts * 2;
            pathf[pn] = 0;
            paths[pn] = -60 * lr;
            patha[pn] = 0;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = tc;
            pathf[pn] = 0;
            paths[pn] = -30 * lr;
            patha[pn] = 0;
            pathb[pn] = 180 * lr;
        }
        else {
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 50;
            paths[pn] = -30 * lr;
            patha[pn] = og ? 180 * lr : 40 * lr;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 100;
            paths[pn] = -60 * lr;
            patha[pn] = og ? 0 : -40 * lr;
            pathb[pn] = 10000 - 30 * lr;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 150;
            paths[pn] = -30 * lr;
            patha[pn] = og ? 0 : -40 * lr;
            pathb[pn] = 10000 - 30 * lr;
            pn++;
            patht[pn] = ts;
            pathf[pn] = 200;
            paths[pn] = 0;
            patha[pn] = og ? 0 : 40 * lr;
            pathb[pn] = 10000 + 30 * lr;
            pn++;
            patht[pn] = tc;
            pathf[pn] = 200;
            paths[pn] = -30 * lr;
            patha[pn] = og ? 0 : 180 * lr;
            pathb[pn] = 180 * lr;
            b += 180 * lr;
        }

        if (ov) {
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = tx;
            pathf[pn] = 50 - 17;
            paths[pn] = (e - 30) * lr;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
        else if (!ob) {
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = tx;
            pathf[pn] = 50;
            paths[pn] = (e - 30) * lr;
            patha[pn] = normalangle(a2 - (dancer[i].a + b), -180);
            pathb[pn] = 0;
        }
        else if (oh) {
            patht[pn] = tx + tc;
            pathf[pn] = 0;
            paths[pn] = -30 * lr;
            patha[pn] = normalangle(a2 - (dancer[i].a + b), 0) - 360;
            pathb[pn] = 90 * lr;
        }
        else if (oi) {
            pn++;
            patht[pn] = tx;
            pathf[pn] = 0;
            paths[pn] = (-s + 30) * lr;
            patha[pn] = normalangle(a2 - (dancer[i].a + b), 0) - 360;
            pathb[pn] = 0;
        }
        else if ((of) && (!og)) {
            b -= 180 * lr;
            patht[pn] = tx + tc;
            pathf[pn] = 200;
            paths[pn] = -30 * lr;
            patha[pn] = normalangle(a2 - (dancer[i].a + b), 0) - 360;
            pathb[pn] = 90 * lr;
        }
        else if (of) {
            patht[pn] = tx + tc;
            pathf[pn] = 200;
            paths[pn] = -30 * lr;
            patha[pn] = normalangle(a2 - (dancer[i].a + b), 0);
            pathb[pn] = 90 * lr;
        }
        else {
            b -= 180;
            patht[pn] = tx + tc;
            pathf[pn] = 100;
            paths[pn] = 30 * lr;
            patha[pn] = normalangle(a2 - (dancer[i].a + b), 0);
            pathb[pn] = 90 * lr;
        }

    }

    dancer[i].pn = pn + 1;
}

function allerightmiddle(i, mw, t, a, opts) {
    // mw is 2
    // t beats
    // a angle of allemande
    // e end 1/2 distance women to men
    // "s" end facing each other (default)
    // "a" end facing for allemande left (e should be 30)
    // "m" man does the allemande
    // "o" spin out
    // "d" do-si-do instead of allemande
    var s, p, pn, m, e;

    e = 50;
    if (opts.indexOf("2") >= 0) e = 20;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;

    if (opts.indexOf("m") < 0) {
        m = woman;
        findset(i, "r");
    }
    else {
        m = man;
        findset(i, "l");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    if (opts.indexOf("d") >= 0) p = 0; else p = 20;
    s = Math.round(dis(i, dancer[i].p) / 2);

    pn = dancer[i].pn;
    patht[pn] = -3;

    if ((opts.indexOf("d") >= 0) && (dancer[i].s == m)) {
        pn++;
        patht[pn] = 10;
        pathf[pn] = 10;
        paths[pn] = -s;
        patha[pn] = 0;
        pathb[pn] = 10000 - 30;
        pn++;
        patht[pn] = t * 5 - 5;
        pathf[pn] = 100;
        paths[pn] = -s;
        patha[pn] = 270;
        pathb[pn] = 10000 - 45;
        pathr[pn] = "ar";
        pn++;
        patht[pn] = t * 5 - 5;
        pathf[pn] = 0;
        paths[pn] = -s;
        patha[pn] = 270;
        pathb[pn] = 10000 - 45;
    }
    else if (dancer[i].s == m) {
        pn++;
        patht[pn] = 10;
        pathf[pn] = 20;
        paths[pn] = -s;
        patha[pn] = 90;
        pathb[pn] = 10000 + 45;
        pn++;
        patht[pn] = t * 10 - 20;
        pathf[pn] = 50;
        paths[pn] = -s;
        patha[pn] = 45 - a;
        pathb[pn] = 45 - a;
        pathr[pn] = "ar";
        pn++;
        patht[pn] = 10;
        pathf[pn] = 50;
        paths[pn] = -s;
        patha[pn] = 45;
        pathb[pn] = -45;

        if (opts.indexOf("a") >= 0) patha[pn] = -45;
        if (opts.indexOf("o") >= 0) patha[pn] = 45 - 360;
    }
    else {
        pn++;
        patht[pn] = 20;
        pathf[pn] = p - e * 2;
        paths[pn] = s;
        patha[pn] = 0;
        pathb[pn] = 10000 + 40;
        pn++;
        patht[pn] = t * 10 - 30;
        pathf[pn] = p - e * 2;
        paths[pn] = s;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = p - e * 2;
        paths[pn] = s;
        patha[pn] = 0;
        pathb[pn] = 0;

        if (opts.indexOf("a") >= 0) patha[pn] = -90;
    }

    dancer[i].pn = pn + 1;
}

function alleleftmiddle(i, mw, t, a, opts) {
    // mw is 2
    // can start from special star exit formation (r) or wave across
    // t beats
    // a angle of men allemande
    // e end 1/2 distance women to men
    // "s" end facing each other (default)
    // "r" end facing for star promenade (e should be 20)
    // "a" end facing for allemande right (e should be 30)
    // "l" lady does the allemande
    // "o" spin out
    // "2","3","4" end distance 20,30,40
    var or, s, pn, ol, ow, e;

    e = 50;
    if (opts.indexOf("2") >= 0) e = 20;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;
    if (opts.indexOf("l") >= 0) ol = woman; else ol = man;

    or = false;
    ow = false;
    findset(i, "y");
    if (dancer[i].p >= 0) {
        ow = true;
        if (xor(Math.abs(dancer[i].y) > 75, dancer[i].s == man)) dancer[i].p = -1;
    }
    else if (ol == man) {
        findset(i, "m");
        if (dancer[i].p >= 0) or = true;
        else findset(i, "r");
    }
    else {
        findset(i, "n");
        if (dancer[i].p >= 0) or = true;
        else findset(i, "l");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    if (dancer[i].s == ol) s = Math.round(dis(i, dancer[i].p) / 2);
    else s = Math.round(Math.abs(dancer[i].x - dancer[dancer[i].o].x) / 2);

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == ol) {
        if (or) {
            pn++;
            patht[pn] = t * 10 - 10;
            pathf[pn] = 0;
            paths[pn] = -30;
            patha[pn] = a - 45;
            pathb[pn] = a - 45;
            pathr[pn] = "al";
            pn++;
            patht[pn] = 10;
            pathf[pn] = 0;
            paths[pn] = -30;
            patha[pn] = -45;
            pathb[pn] = 45;
        }
        else if (ow) {
            pn++;
            patht[pn] = 10;
            pathf[pn] = 47;
            paths[pn] = -37.5;
            patha[pn] = 90;
            pathb[pn] = 10000 + 45;
            pn++;
            patht[pn] = t * 10 - 20;
            pathf[pn] = 17;
            paths[pn] = -37.5;
            patha[pn] = a - 180;
            pathb[pn] = a - 180;
            pathr[pn] = "al";
            pn++;
            patht[pn] = 10;
            pathf[pn] = 17;
            paths[pn] = -37.5;
            patha[pn] = 0;
            pathb[pn] = 90;

        }
        else {
            pn++;
            patht[pn] = 10;
            pathf[pn] = 20;
            paths[pn] = s;
            patha[pn] = -90;
            pathb[pn] = 10000 - 45;
            pn++;
            patht[pn] = t * 10 - 20;
            pathf[pn] = 50;
            paths[pn] = s;
            patha[pn] = a - 45;
            pathb[pn] = a - 45;
            pathr[pn] = "al";
            pn++;
            patht[pn] = 10;
            pathf[pn] = 50;
            paths[pn] = s;
            patha[pn] = -45;
            pathb[pn] = 45;
        }

        if (opts.indexOf("r") >= 0) patha[pn] = 45;
        if (opts.indexOf("a") >= 0) patha[pn] = 45;
        if (opts.indexOf("o") >= 0) patha[pn] = -45 - 360;
    }
    else {
        if (ow) {
            pn++;
            patht[pn] = 20;
            pathf[pn] = 17;
            paths[pn] = 112.5 - e * 2 - 30;
            patha[pn] = -90;
            pathb[pn] = 0;
            pn++;
            patht[pn] = t * 10 - 30;
            pathf[pn] = 17;
            paths[pn] = 112.5 - e * 2 - 30;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 10;
            pathf[pn] = 17;
            paths[pn] = 112.5 - e * 2 - 30;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
        else {
            pn++;
            patht[pn] = 20;
            pathf[pn] = 20 - e * 2;
            paths[pn] = -s;
            patha[pn] = 0;
            pathb[pn] = 10000 - 40;
            pn++;
            patht[pn] = t * 10 - 30;
            pathf[pn] = 20 - e * 2;
            paths[pn] = -s;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 10;
            pathf[pn] = 20 - e * 2;
            paths[pn] = -s;
            patha[pn] = 0;
            pathb[pn] = 0;
        }

        if (opts.indexOf("r") >= 0) patha[pn] = -90;
        if (opts.indexOf("a") >= 0) patha[pn] = 90;
    }

    dancer[i].pn = pn + 1;
}

function starpromenade(i, mw, t, opts) {
    // mw is 2
    // t total time
    // "q" progress via slide right
    // "3","4" end distance 30,40
    var e, mt;

    e = 50;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;

    findset(i, "p");
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    mt = Math.round((t - 4) * 10 / 4);

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == man) {
        pn++;
        patht[pn] = 40;
        pathf[pn] = 0;
        paths[pn] = -30;
        patha[pn] = 180;
        pathb[pn] = 180;

        pn++;
        patht[pn] = -3;

        pn++;
        patht[pn] = t * 10 - mt - 40;
        pathf[pn] = 0;
        paths[pn] = 20;
        patha[pn] = 360;
        pathb[pn] = 360;
        pn++;
        patht[pn] = mt;
        pathf[pn] = -e;
        paths[pn] = 20;
        patha[pn] = 90;
        pathb[pn] = 10000 + 20;
        if (opts.indexOf("q") >= 0) {
            mt = Math.round((t * 10 - 40) / 5);
            pn -= 2;
            pn++;
            patht[pn] = mt;
            pathf[pn] = 5;
            paths[pn] = 20;
            patha[pn] = 90;
            pathb[pn] = 10000 + 10;
            pn++;
            patht[pn] = mt;
            pathf[pn] = 50;
            paths[pn] = 40;
            patha[pn] = 90;
            pathb[pn] = 10000 + 45;
            pn++;
            patht[pn] = mt;
            pathf[pn] = 95;
            paths[pn] = 20;
            patha[pn] = 90;
            pathb[pn] = 10000 + 45;
            pn++;
            patht[pn] = mt;
            pathf[pn] = 100;
            paths[pn] = 0;
            patha[pn] = 90;
            pathb[pn] = 10000 + 10;
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = t * 10 - 40 - mt * 4;
            pathf[pn] = -e;
            paths[pn] = 20;
            patha[pn] = 90;
            pathb[pn] = 10000 + 20;
        }
    }
    else {
        pn++;
        patht[pn] = 40;
        pathf[pn] = 0;
        paths[pn] = -70;
        patha[pn] = 180;
        pathb[pn] = 180;

        pn++;
        patht[pn] = -3;

        pn++;
        patht[pn] = t * 10 - mt - 40;
        pathf[pn] = 0;
        paths[pn] = -20;
        patha[pn] = 360;
        pathb[pn] = 360;
        pn++;
        patht[pn] = mt;
        pathf[pn] = e;
        paths[pn] = -20;
        patha[pn] = 90;
        pathb[pn] = 10000 + 20;
        if (opts.indexOf("q") >= 0) {
            mt = Math.round((t * 10 - 40) / 5);
            pn -= 2;
            pn++;
            patht[pn] = mt;
            pathf[pn] = 45;
            paths[pn] = -20;
            patha[pn] = 90;
            pathb[pn] = 10000 + 45;
            pn++;
            patht[pn] = mt;
            pathf[pn] = 50;
            paths[pn] = -40;
            patha[pn] = 90;
            pathb[pn] = 10000 + 10;
            pn++;
            patht[pn] = mt;
            pathf[pn] = 55;
            paths[pn] = -20;
            patha[pn] = 90;
            pathb[pn] = 10000 + 10;
            pn++;
            patht[pn] = mt;
            pathf[pn] = 100;
            paths[pn] = 0;
            patha[pn] = 90;
            pathb[pn] = 10000 + 45;
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = t * 10 - 40 - mt * 4;
            pathf[pn] = e;
            paths[pn] = -20;
            patha[pn] = 90;
            pathb[pn] = 10000 + 20;
        }
    }

    dancer[i].pn = pn + 1;
}

function forwardright(i, mw, opts) {
    // mw is 2
    // "5" e=50
    var e, en, j;

    e = 35; // end disdance from middle
    if (opts.indexOf("5") >= 0) e = 50;

    findset(i, "c");
    if (dancer[i].p < 0) {
        if (dancer[i].s == woman) {
            j = finddancer(i, "l");
            s = Math.round(dis(i, j) / 2);
            pn = dancer[i].pn;
            patht[pn] = -3;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 100;
            paths[pn] = 50 - s;
            patha[pn] = 30000 + 90;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 50;
            pathf[pn] = 100;
            paths[pn] = 50 - s;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
        else {
            j = finddancer(i, "r");
            s = Math.round(dis(i, j) / 2);
            pn = dancer[i].pn;
            patht[pn] = -3;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 0;
            paths[pn] = 50 + s;
            patha[pn] = 30000 + 90;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 50;
            pathf[pn] = 0;
            paths[pn] = 50 + s;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
        dancer[i].pn = pn + 1;
        return;
    }
    dancer[i].e = false;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == woman) {
        pn++;
        patht[pn] = 30;
        pathf[pn] = 25 * r2 * 2.5;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 25 * r2 * 3;
        paths[pn] = -25 * r2;
        patha[pn] = 45;
        pathb[pn] = 45;
        pn++;
        patht[pn] = 30;
        pathf[pn] = (50 + e / 2) * r2;
        paths[pn] = e / 2 * r2;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = (50 + e / 2) * r2;
        paths[pn] = e / 2 * r2;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else {
        pn++;
        patht[pn] = 30;
        pathf[pn] = 25 * r2 * 2.5;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = 25 * r2 * 3;
        paths[pn] = 25 * r2;
        patha[pn] = 45;
        pathb[pn] = 45;
        pn++;
        patht[pn] = 30;
        pathf[pn] = (50 - e / 2) * r2;
        paths[pn] = (50 - e / 2) * r2;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 10;
        pathf[pn] = (50 - e / 2) * r2;
        paths[pn] = (50 - e / 2) * r2;
        patha[pn] = 0;
        pathb[pn] = 0;
    }

    dancer[i].pn = pn + 1;
}

function forwardleft(i, mw, opts) {
    // mw is 2
    // "5" e=50
    // "r" back on the right diagonal
    var e, en, j, or;

    or = opts.indexOf("r") >= 0;
    e = 35; // end distance from middle
    if (opts.indexOf("5") >= 0) e = 50;

    findset(i, "c");
    if (dancer[i].p < 0) {
        pn = dancer[i].pn;
        patht[pn] = -3;
        if (dancer[i].s == woman) {
            j = finddancer(i, "l");
            s = Math.round(dis(i, j) / 2);
            if (or) {
                pn++;
                patht[pn] = 20;
                pathf[pn] = 0;
                paths[pn] = 0;
                patha[pn] = 0;
                pathb[pn] = 0;
                pn++;
                patht[pn] = 40;
                pathf[pn] = 100;
                paths[pn] = 0;
                patha[pn] = 400000 - 180;
                pathb[pn] = 10000 - 90;
                pn++;
                patht[pn] = 20;
                pathf[pn] = 100;
                paths[pn] = 0;
                patha[pn] = 0;
                pathb[pn] = 0;
            }
            else {
                pn++;
                patht[pn] = 30;
                pathf[pn] = 0;
                paths[pn] = 50 - s - 100;
                patha[pn] = 30000 - 90;
                pathb[pn] = 0;
                pn++;
                patht[pn] = 50;
                pathf[pn] = 0;
                paths[pn] = 50 - s - 100;
                patha[pn] = 0;
                pathb[pn] = 0;
            }
        }
        else {
            j = finddancer(i, "r");
            s = Math.round(dis(i, j) / 2);
            if (or) {
                pn++;
                patht[pn] = 20;
                pathf[pn] = 0;
                paths[pn] = 0;
                patha[pn] = 0;
                pathb[pn] = 0;
                pn++;
                patht[pn] = 40;
                pathf[pn] = 100;
                paths[pn] = 0;
                patha[pn] = 400000 - 180;
                pathb[pn] = 10000 - 30;
                pn++;
                patht[pn] = 20;
                pathf[pn] = 100;
                paths[pn] = 0;
                patha[pn] = 0;
                pathb[pn] = 0;
            }
            else {
                pn++;
                patht[pn] = 30;
                pathf[pn] = 100;
                paths[pn] = s - 50;
                patha[pn] = 30000 - 90;
                pathb[pn] = 0;
                pn++;
                patht[pn] = 50;
                pathf[pn] = 100;
                paths[pn] = s - 50;
                patha[pn] = 0;
                pathb[pn] = 0;
            }
        }
        dancer[i].pn = pn + 1;
        return;
    }
    dancer[i].e = false;

    pn = dancer[i].pn;
    patht[pn] = -3;
    pn++;
    patht[pn] = 30;
    pathf[pn] = 25 * r2 * 2.5;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;

    if (dancer[i].s == woman) {
        if (or) {
            pn++;
            patht[pn] = 10;
            pathf[pn] = 25 * r2 * 2;
            paths[pn] = -25 * r2 * .5;
            patha[pn] = 90;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 25 * r2 * 2;
            paths[pn] = 25 * r2 * 2;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = 10;
            pathf[pn] = -25 * r2;
            paths[pn] = -25 * r2;
            patha[pn] = 45;
            pathb[pn] = 0;
        }
        else {
            pn++;
            patht[pn] = 10;
            pathf[pn] = 25 * r2 * 3;
            paths[pn] = -25 * r2;
            patha[pn] = -45;
            pathb[pn] = -45;
            pn++;
            patht[pn] = 30;
            pathf[pn] = (50 - e / 2) * r2;
            paths[pn] = (e / 2 - 50) * r2;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 10;
            pathf[pn] = (50 - e / 2) * r2;
            paths[pn] = (e / 2 - 50) * r2;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
    }
    else {
        if (or) {
            pn++;
            patht[pn] = 10;
            pathf[pn] = 25 * r2 * 2;
            paths[pn] = 25 * r2 * .5;
            patha[pn] = -90;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 25 * r2 * 2;
            paths[pn] = -25 * r2 * 2;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = -3;
            pn++;
            patht[pn] = 10;
            pathf[pn] = 25 * r2;
            paths[pn] = -25 * r2;
            patha[pn] = 45;
            pathb[pn] = 0;
        }
        else {
            pn++;
            patht[pn] = 10;
            pathf[pn] = 25 * r2 * 3;
            paths[pn] = 25 * r2;
            patha[pn] = -45;
            pathb[pn] = -45;
            pn++;
            patht[pn] = 30;
            pathf[pn] = (50 + e / 2) * r2;
            paths[pn] = -e / 2 * r2;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 10;
            pathf[pn] = (50 + e / 2) * r2;
            paths[pn] = -e / 2 * r2;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
    }

    dancer[i].pn = pn + 1;
}

function giveandtake(i, mw, opts) {
    // mw is 2
    // "l" starts with lady on the left
    // "w" women take
    var ol, ow, s, d;

    ow = opts.indexOf("w") >= 0;

    if (opts.indexOf("l") >= 0) {
        ol = true;
        findset(i, "l");
    } else {
        findset(i, "r");
        ol = false;
    }
    if (dancer[i].p < 0) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    d = Math.round(dis(i, dancer[i].p) / 2);
    if (d < 45) s = 0; else if (ol) s = -2; else s = 2;

    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 30;
    pathf[pn] = 33;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 33;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;

    if (xor(ow, dancer[i].s == woman)) {
        pn++;
        patht[pn] = 40;
        pathf[pn] = -20;
        paths[pn] = s;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else {
        pn++;
        patht[pn] = 40;
        pathf[pn] = 80;
        paths[pn] = -s;
        patha[pn] = 0;
        pathb[pn] = 0;
    }

    dancer[i].pn = pn + 1;

}


function rollaway(i, mw, opts) {
    // mw is 2
    // "l" starts with lady on the left
    // "m" men roll left
    // "e" include the ends
    // "2" e=20
    // "s" t=2
    var en, sr, e, t;

    if (opts.indexOf("m") >= 0) sr = man; else sr = woman;

    e = 50;
    if (opts.indexOf("2") >= 0) e = 20;
    t = 4;
    if (opts.indexOf("s") >= 0) t = 2;

    en = false;
    if ((opts.indexOf("l") >= 0) || (sr == man)) findset(i, "l");
    else findset(i, "r");
    if ((dancer[i].p < 0) && (opts.indexOf("e") >= 0)) {
        en = true;
        findset(i, "j");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = t * 10;
    pathb[pn] = 10000 + 45;
    if (en) {
        pathf[pn] = 100;
        paths[pn] = 0;
        patha[pn] = 180;
    }
    else if (dancer[i].s == 1 - sr) {
        pathf[pn] = 0;
        paths[pn] = 50 + e;
        patha[pn] = 0;
    }
    else {
        pathf[pn] = 0;
        paths[pn] = -50 - e;
        patha[pn] = 360;
    }

    dancer[i].pn = pn + 1;
}

function llgypsyll(i, mw, opts) {
    // mw  is 2
    // "b" men take opposite back
    // end directions "a","d","e","s","r","n","t","u","p","y"
    var ob, d;


    ob = opts.indexOf("b") >= 0;

    findset(i, "r");
    if (dancer[i].p < 0) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    d = Math.round(dis(i, dancer[i].p) / 2);

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == man) {
        pn++;
        patht[pn] = 27;
        pathf[pn] = 30;
        paths[pn] = d - 50;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 26;
        pathf[pn] = 50;
        paths[pn] = d - 50;
        patha[pn] = -180;
        pathb[pn] = -180;
        pn++;
        patht[pn] = 27;
        pathf[pn] = 100;
        paths[pn] = d - 50;
        patha[pn] = 0;
        pathb[pn] = 0;
        if (ob) {
            pathf[pn] = 120;
            paths[pn] += 2;
        }

    }
    else {
        pn++;
        patht[pn] = 27;
        pathf[pn] = 30;
        paths[pn] = 50 - d;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = 26;
        pathf[pn] = 50;
        paths[pn] = 50 - d;
        patha[pn] = -180;
        pathb[pn] = -180;
        pn++;
        patht[pn] = 27;
        pathf[pn] = 100;
        paths[pn] = 50 - d;
        patha[pn] = 0;
        pathb[pn] = 0;
        if (ob) {
            pathf[pn] = 20;
            paths[pn] -= 2;
        }
    }

    dancer[i].pn = pn + 1;
}

function longlines(i, mw, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // "f" forward only
    // "b" back only
    // "w" women roll
    // "m" men roll
    // "l" starts with ladies on the left
    // "o" include the ends
    // "q" for longlines to diagonal men's chain
    // end directions "a","d","e","s","r","n","t","u","p","y"
    var opts2, q1, q2, a2, pn, od, oe, u, t, en, sr, rr, ol, od2, f, oq;

    f = new Object();
    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    oq = opts.indexOf("q") >= 0;
    od = opts.indexOf("d") >= 0;
    oe = opts.indexOf("e") >= 0;
    ol = opts.indexOf("l") >= 0;
    if (opts.indexOf("m") >= 0) sr = man; else if (opts.indexOf("w") >= 0) sr = woman; else sr = -1;
    rr = xor(ol, sr == man); // roll right
    if ((opts.indexOf("b") >= 0) || (opts.indexOf("f") >= 0)) t = 4; else t = 8;

    en = false;
    if (ol) findset(i, "l"); else findset(i, "r");
    if ((dancer[i].p < 0) && (opts.indexOf("o") >= 0)) {
        if (sr >= 0) en = true;
        findset(i, "j");
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }

    if ((opts.indexOf("b") >= 0) && (Math.round(dis(i, dancer[i].n) / 10) != 3)) {
        atend(i, mw, t);
        return;
    }
    if ((opts.indexOf("f") >= 0) && (Math.round(dis(i, dancer[i].n) / 10) != 10)) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    opts2 = opts;
    if (whichdir(opts2) == "") opts2 += "a";

    q1 = whichquad(i, 0);
    if ((opts.indexOf("m") < 0) || (opts.indexOf("w") < 0)) q2 = q1;
    else {
        if (q1 == 0) q2 = 1; else if (q1 == 1) q2 = 0; else if (q1 == 2) q2 = 3; else if (q1 == 3) q2 = 2;
    }
    a2 = whatangle(q2, whichdir(opts2)); // final angle

    if (od) f = enddancers();
    od2 = od;
    if (ol || oq) od2 = false; // slice and dice only?
    if (od) od = odset(i, q1, q2);
    if (oq) oq = od;
    if (oe) oe = oeset(i, q1, q2);

    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 30;
    pathf[pn] = 33;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pathr[pn] = "li";
    pn++;
    patht[pn] = 10;
    pathf[pn] = 33;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pathr[pn] = "li";

    if (opts.indexOf("f") >= 0);
    else if (opts.indexOf("b") >= 0) {
        pathf[pn] = -33;
        pathf[pn - 1] = -33;
    }
    else if (((sr < 0) && (dancer[i].s == man)) || (dancer[i].s == (1 - sr))) {
        pn++;
        patht[pn] = 40;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pathr[pn] = "li";
        if (oe) pathf[pn] += 40000;
        else if (od) pathf[pn] += 30000;
        else patha[pn] = 400000 + normalangle(a2 - dancer[i].a, -180);

        if (en) {
            patht[pn] = 10;
            pathf[pn] = 22;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 100;
            paths[pn] = 0;
            patha[pn] = 180;
            pathb[pn] = 10000 + 45;
        }
        else if ((sr >= 0) && (!rr)) {
            patht[pn] = 10;
            pathf[pn] = 22;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 0;
            paths[pn] = 100;
            patha[pn] = normalangle(a2 - dancer[i].a, -180);
            pathb[pn] = 10000 + 30;
            if (od2) {
                pathf[pn] += 30000;
                pathb[pn] += 60;
            }
            else if (oq) {
                pathf[pn] += 80000;
                pathb[pn] += 75;
            }
            else if (od && (!ol)) pathb[pn] -= 60; // slice and dice only?
            else if (od) {
                pathf[pn] += 30000;
                pathb[pn] += 60;
            }
            if (oe) {
                pathf[pn] += 40000;
                pathb[pn] -= 60;
            }
        }
        else if (sr >= 0) {
            patht[pn] = 10;
            pathf[pn] = 22;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 0;
            paths[pn] = -100;
            patha[pn] = normalangle(a2 - dancer[i].a, -180);
            pathb[pn] = 10000 - 30;
        }
    }
    else {
        pn++;
        patht[pn] = 40;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pathr[pn] = "li";
        if (oe) pathf[pn] += 40000;
        else if (od) pathf[pn] += 30000;
        else patha[pn] = 400000 + normalangle(a2 - dancer[i].a, -180);

        if (en) {
            patht[pn] = 10;
            pathf[pn] = 22;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 100;
            paths[pn] = 0;
            patha[pn] = 180;
            pathb[pn] = 10000 + 45;
            if (od) {
                pathf[pn] += 30000;
            }
        }
        else if ((sr >= 0) && (!rr)) {
            patht[pn] = 10;
            pathf[pn] = 22;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 0;
            paths[pn] = -100;
            patha[pn] = 360 + normalangle(a2 - dancer[i].a, -180);
            pathb[pn] = 10000 + 30;
            if (od && (f.dur == f.wur) && (i == f.wsur));
            else if (oq) {
                pathf[pn] += 80000;
                pathb[pn] += 75;
            }
            else if (od && (f.dll == f.wll) && (i == f.wsll));
            else if (od) {
                pathf[pn] += 30000;
                pathb[pn] += 30;
            }
            else if (od2) {
                pathf[pn] = 30000 + 100;
                paths[pn] = -200;
                patha[pn] = 180;
                pathb[pn] = 10000 - 30;
            }
            if (od && (!ol)) pathb[pn] -= 45; // slice and dice only?
            if (oe) {
                pathf[pn] += 40000;
                pathb[pn] -= 30;
            }
        }
        else if (sr >= 0) {
            patht[pn] = 10;
            pathf[pn] = 22;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 30;
            pathf[pn] = 0;
            paths[pn] = 100;
            patha[pn] = -360 + normalangle(a2 - dancer[i].a, -180);
            pathb[pn] = 10000 - 30;
        }
    }

    dancer[i].pn = pn + 1;
}

function twirltoswap(i, mw, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // t time
    // "u" set of four
    // "c" california twirl
    // "f" swat the flea
    // "r" box the gnat ending in star orientation
    // "s" star through
    // default box the gnat ending facing each other
    var e, d, u, t, pn;

    t = 4;
    e = 50; // end distance from center

    if (opts.indexOf("u") >= 0) {
        findset(i, "r");
        if (dancer[i].p < 0) findset(i, "l");
    }
    else {
        if (opts.indexOf("c") >= 0) findset(i, "d"); else findset(i, "g");
    }

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    if (opts.indexOf("c") >= 0) d = Math.round(dis(i, dancer[i].p) / 2);
    else d = Math.round(dis(i, dancer[i].n) / 2);

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == man) {
        if (opts.indexOf("c") >= 0) {
            pn++;
            patht[pn] = t * 10;
            pathf[pn] = 0;
            paths[pn] = d + e;
            patha[pn] = -180;
            pathb[pn] = 10000 - 48;
        }
        else {
            pn++;
            patht[pn] = t * 10;
            pathf[pn] = d + e;
            paths[pn] = 0;
            patha[pn] = -180;
            pathb[pn] = 10000 - 48;
            if (opts.indexOf("r") >= 0) patha[pn] = -90;
            if (opts.indexOf("s") >= 0) patha[pn] = -90;
            if (opts.indexOf("f") >= 0) {
                patha[pn] = 180;
                pathb[pn] = 10000 + 48;
            }
        }
    }
    else {
        if (opts.indexOf("c") >= 0) {
            pn++;
            patht[pn] = t * 10;
            pathf[pn] = 0;
            paths[pn] = -d - e;
            patha[pn] = 180;
            pathb[pn] = 10000 - 48;
        }
        else {
            pn++;
            patht[pn] = t * 10;
            pathf[pn] = d + e;
            paths[pn] = 0;
            patha[pn] = 180;
            pathb[pn] = 10000 - 48;
            if (opts.indexOf("r") >= 0) patha[pn] = 180;
            if (opts.indexOf("s") >= 0) patha[pn] = 90;
            if (opts.indexOf("f") >= 0) {
                patha[pn] = -180;
                pathb[pn] = 10000 + 48;
            }
        }
    }

    dancer[i].pn = pn + 1;
}

function allemanderight(i, mw, t, a, s, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // opposite sex only if all
    // t is swing time
    // a is angle to rotate clockwise
    // s is sideways distance (man's view) for the center of the allemande
    // "p" end progressed
    // "i" end facing each other
    // "a" end in allemande position
    // "w" end in wavy line
    // "h" end in a hotspot sideways for "a" or forward for "p" or " "
    var e, oa, d, u, md, me, mt, ms, pn, f;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    e = 50;
    if (opts.indexOf("2") >= 0) e = 25;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;
    if (opts.indexOf("7") >= 0) e = 37.5;

    oa = false;
    if (mw == all) findset(i, "g");
    else {
        findset(i, "f");
        if (dancer[i].p >= 0) {
            if (((mw == men) || (mw == women)) && (dancer[dancer[i].p].s != dancer[i].s)) dancer[i].p = -1;
        }
    }
    if (dancer[i].p < 0) {
        oa = true;
        findset(i, "b");
        if (dancer[i].p >= 0) {
            if (((mw == men) || (mw == women)) && (dancer[dancer[i].p].s != dancer[i].s)) dancer[i].p = -1;
            else if ((mw == all) && (dancer[dancer[i].p].s == dancer[i].s)) dancer[i].p = -1;
        }
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    if (opts.indexOf("w") >= 0) f = 17; else f = 0;
    d = Math.round(dis(i, dancer[i].p) / 2);
    mt = (a - 180) / 3 + Math.sqrt(d * d + 400) + Math.sqrt(e * e + 400);
    md = Math.round(Math.sqrt(d * d + 400) / mt * t * 10);
    me = Math.round(Math.sqrt(e * e + 400) / mt * t * 10);
    if (dancer[i].s == man) ms = s; else ms = -s;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (oa) {
        pn++;
        patht[pn] = md;
        pathf[pn] = 30;
        paths[pn] = d;
        patha[pn] = -90;
        pathb[pn] = 10000 - 20;
        pathr[pn] = "ar";
        pn++;
        patht[pn] = (t * 10 - md - me);
        pathf[pn] = 0;
        paths[pn] = d;
        patha[pn] = -a + 180;
        pathb[pn] = -a + 180;
        pathr[pn] = "ar";
        pn++;
        patht[pn] = me;
        pathf[pn] = e * Math.sin(a * rpd) + f * Math.cos(a * rpd);
        paths[pn] = d - e * Math.cos(a * rpd) + f * Math.sin(a * rpd);
        patha[pn] = -90;
        pathb[pn] = 10000 - 20;
    }
    else {
        pn++;
        patht[pn] = md;
        pathf[pn] = d;
        paths[pn] = -30 + ms;
        patha[pn] = 0;
        pathb[pn] = 10000 - 20;
        pathr[pn] = "ar";
        pn++;
        patht[pn] = (t * 10 - md - me);
        pathf[pn] = d;
        paths[pn] = ms;
        patha[pn] = -a + 180;
        pathb[pn] = -a + 180;
        pathr[pn] = "ar";
        pn++;
        patht[pn] = me;
        pathf[pn] = d - e * Math.cos(a * rpd) - f * Math.sin(a * rpd);
        paths[pn] = ms - e * Math.sin(a * rpd) + f * Math.cos(a * rpd);
        patha[pn] = -90;
        pathb[pn] = 10000 - 20;
    }
    if (opts.indexOf("i") >= 0) patha[pn] = -180;
    if (opts.indexOf("p") >= 0) patha[pn] = -360;
    if (opts.indexOf("h") >= 0) {
        if (e == 50) pathf[pn] += 20000; else pathf[pn] += 10000;
    }

    dancer[i].pn = pn + 1;
}

function allemandeleft(i, mw, t, a, s, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // opposite sex only if all
    // t is swing time
    // a is angle to rotate clockwise
    // s is sideways distance (man's view) for the center of the allemande
    // "p" end progressed
    // "a" end in allemande position
    // "n" men end plus 90 degrees
    // "o" men end plus 180 degrees
    // "q" women end plus 180 degrees
    // "h" end in a hotspot sideways for "a" or forward for "p" or " "
    var e, d, t2, u, md, me, mt, ms, pn, sa, b, ov, oa, on, oo;

    ov = opts.indexOf("v") >= 0;
    on = opts.indexOf("n") >= 0;
    oo = opts.indexOf("o") >= 0;
    oa = opts.indexOf("a") >= 0;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    e = 50;
    if (opts.indexOf("2") >= 0) e = 25;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;

    sa = false;
    if (mw == all) findset(i, "g");
    else {
        findset(i, "f");
        if (dancer[i].p >= 0) {
            if (((mw == men) || (mw == women)) && (dancer[dancer[i].p].s != dancer[i].s)) dancer[i].p = -1;
        }
    }
    if (dancer[i].p < 0) {
        sa = true;
        findset(i, "a");
        if (dancer[i].p >= 0) {
            if (((mw == men) || (mw == women)) && (dancer[dancer[i].p].s != dancer[i].s)) dancer[i].p = -1;
            else if ((mw == all) && (dancer[dancer[i].p].s == dancer[i].s)) dancer[i].p = -1;
        }
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    t2 = t * 10;
    if (ov) t2 -= 3;
    d = Math.round(dis(i, dancer[i].p) / 2);
    mt = (a - 180) / 3 + Math.sqrt(d * d + 400) + Math.sqrt(e * e + 400);
    md = Math.round(Math.sqrt(d * d + 400) / mt * t2);
    me = Math.round(Math.sqrt(e * e + 400) / mt * t2);
    if (dancer[i].s == man) ms = s; else ms = -s;
    b = dancer[i].a;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (ov) {
        pn++;
        patht[pn] = 3;
        pathf[pn] = 17;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pathr[pn] = "al";
        pn++;
        patht[pn] = -3;
    }

    if (sa) {
        pn++;
        patht[pn] = md;
        pathf[pn] = 30;
        paths[pn] = -d;
        patha[pn] = 90;
        pathb[pn] = 10000 + 20;
        pathr[pn] = "al";
        if (a > 180) {
            pn++;
            patht[pn] = t2 - md - me;
            pathf[pn] = 0;
            paths[pn] = -d;
            patha[pn] = a - 180;
            pathb[pn] = a - 180;
            pathr[pn] = "al";
        }
        pn++;
        patht[pn] = me;
        pathf[pn] = e * Math.sin(a * rpd);
        paths[pn] = -d + e * Math.cos(a * rpd);
        patha[pn] = 90;
        pathb[pn] = 10000 + 20;
        b += a - 180;
    }
    else {
        pn++;
        patht[pn] = md;
        pathf[pn] = d;
        paths[pn] = 30 - ms;
        patha[pn] = 0;
        pathb[pn] = 10000 + 20;
        pathr[pn] = "al";
        if (a > 180) {
            pn++;
            patht[pn] = t2 - md - me;
            pathf[pn] = d;
            paths[pn] = -ms;
            patha[pn] = a - 180;
            pathb[pn] = a - 180;
            pathr[pn] = "al";
        }
        pn++;
        patht[pn] = me;
        pathf[pn] = d - e * Math.cos(a * rpd);
        paths[pn] = e * Math.sin(a * rpd) - ms;
        patha[pn] = 90;
        pathb[pn] = 10000 + 20;
        b += a - 90;
    }

    if (opts.indexOf("s") >= 0) {
        b = normalangle(b, 90);
        if ((dancer[i].y < 0) && (b > 90) && (b < 270)) patha[pn] += 90;
        if ((dancer[i].y > 0) && (b > 270) && (b < 450)) patha[pn] += 90;
    }
    if (opts.indexOf("p") >= 0) patha[pn] = 360;
    if (oa) patha[pn] = 90;
    if ((opts.indexOf("n") >= 0) && (dancer[i].s == man)) patha[pn] += 90;
    if ((opts.indexOf("o") >= 0) && (dancer[i].s == man)) patha[pn] += 180;
    if ((opts.indexOf("q") >= 0) && (dancer[i].s == woman)) patha[pn] += 180;
    if (opts.indexOf("h") >= 0) {
        if (e == 50) pathf[pn] += 20000; else pathf[pn] += 10000;
    }

    dancer[i].pn = pn + 1;
}

function dosido(i, mw, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // "o" offset 25 (from circle pass through)
    // "v" to a wave
    // "l" and then look left
    // "r" and then look right

    var ms, u, pn, t, ov;

    ov = opts.indexOf("v") >= 0;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;
    findset(i, "g");
    if (dancer[i].p < 0) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    ms = 0;
    t = 20;
    if (ov) t = 16;

    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 2 * t;
    pathf[pn] = 100;
    paths[pn] = 0;
    patha[pn] = 180;
    pathb[pn] = 10000 - 48;
    if (opts.indexOf("o") >= 0) {
        ms = 25;
        patht[pn] = t;
        pathf[pn] = 50;
        paths[pn] = 0;
        patha[pn] = 90;
        pathb[pn] = 0;
        pn++;
        patht[pn] = t;
        pathf[pn] = 100;
        paths[pn] = ms;
        patha[pn] = 90;
        pathb[pn] = 10000 - 24;
    }
    pn++;
    patht[pn] = t * 2;
    pathf[pn] = 0;
    paths[pn] = ms;
    patha[pn] = 180;
    pathb[pn] = 10000 - 48;

    if (opts.indexOf("l") >= 0) patha[pn] += 90;
    if (opts.indexOf("r") >= 0) patha[pn] -= 90;
    if (ov) {
        pn++;
        patht[pn] = 16;
        pathf[pn] = 70000 + 33;
        paths[pn] = -62.5;
        patha[pn] = 0;
        pathb[pn] = 10000 - 24;
        if ((dancer[i].y > 0) && (dancer[i].x < dancer[dancer[i].p].x)) paths[pn] = -12.5;
        if ((dancer[i].y < 0) && (dancer[i].x > dancer[dancer[i].p].x)) paths[pn] = -12.5;
    }

    dancer[i].pn = pn + 1;
}

function halfpousette(i, mw, opts) {
    // mw = all
    // ladies start forward left
    // "m" men start forward
    // "r" start right

    var mb, ms, ml, pn, t, om, or;

    om = opts.indexOf("m") >= 0;
    or = opts.indexOf("r") >= 0;

    if (xor(om, or)) findset(i, "l"); else findset(i, "r");

    if (dancer[i].p < 0) {
        t = 4;
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    ml = -100;
    ms = -48;
    if (dancer[i].s == man) ml *= -1;
    if (om) ml *= -1;
    if (or) {
        ml *= -1;
        ms *= -1;
    }
    mb = -10;
    if (xor(!om, dancer[i].s == man)) mb = 40;

    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 9;
    pathf[pn] = mb;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 22;
    pathf[pn] = mb;
    paths[pn] = ml;
    patha[pn] = 0;
    pathb[pn] = 10000 - ms;
    pn++;
    patht[pn] = 9;
    pathf[pn] = 0;
    paths[pn] = ml;
    patha[pn] = 0;
    pathb[pn] = 0;

    dancer[i].pn = pn + 1;
}

function madrobin(i, mw, opts) {
    // mw = all
    // ladies start forward left
    // "m" men start forward
    // "r" start right
    // "h" half

    var ms, ml, pn, t, om, or, oh;

    oh = opts.indexOf("h") >= 0;
    om = opts.indexOf("m") >= 0;
    or = opts.indexOf("r") >= 0;

    if (xor(om, or)) findset(i, "l"); else findset(i, "r");

    if (dancer[i].p < 0) {
        if (oh) t = 4; else t = 8;
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    ml = -100;
    ms = -48;
    if (dancer[i].s == man) ml *= -1;
    if (om) ml *= -1;
    if (or) {
        ml *= -1;
        ms *= -1;
    }

    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 40;
    pathf[pn] = 0;
    paths[pn] = ml;
    patha[pn] = 0;
    pathb[pn] = 10000 - ms;
    pn++;
    patht[pn] = 40;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 10000 - ms;
    if (oh) pn--;

    dancer[i].pn = pn + 1;
}

function gypsy(i, mw, t, a, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // t is gypsy time
    // a is angle to rotate clockwise
    // "2","3","4" end distance 20,30,40
    // "p" end progressed
    // "a" end ready for hey
    // "h" end on a hotspot
    // "l" gypsy left
    var d, ol, u, md, me, mt, pn, ob, e;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    if (opts.indexOf("l") >= 0) ol = -1; else ol = 1;

    e = 50;
    if (opts.indexOf("2") >= 0) e = 20;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;

    ob = false; // from allemande right position
    findset(i, "g"); // from facing each other
    if ((ol > 0) && (dancer[i].p < 0)) {
        findset(i, "b");
        ob = true;
    } // allemande right or wave
    if ((ol < 0) && (dancer[i].p < 0)) {
        findset(i, "a");
        ob = true;
    } // allemande left or wave
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    d = Math.round(dis(i, dancer[i].p) / 2);
    mt = (a - 180) / 3 + Math.sqrt(d * d + 400) + Math.sqrt(e * e + 400);
    md = Math.round(Math.sqrt(d * d + 400) / mt * t * 10);
    me = Math.round(Math.sqrt(e * e + 400) / mt * t * 10);

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (ob) {
        pn++;
        patht[pn] = md;
        pathf[pn] = 20;
        paths[pn] = d * ol;
        patha[pn] = -180 * ol;
        pathb[pn] = 10000 - 60 * ol;
    }
    else {
        pn++;
        patht[pn] = md;
        pathf[pn] = d;
        paths[pn] = -20 * ol;
        patha[pn] = -90 * ol;
        pathb[pn] = 10000 - 30 * ol;
    }

    pn++;
    patht[pn] = -3;
    pn++;
    patht[pn] = (t * 10 - md - me);
    pathf[pn] = 20;
    paths[pn] = 0;
    patha[pn] = (-a + 180) * ol;
    pathb[pn] = (-a + 180) * ol;
    pn++;
    patht[pn] = me;
    pathf[pn] = 20 - e * Math.cos((a - 90) * rpd);
    paths[pn] = -e * Math.sin((a - 90) * rpd) * ol;
    patha[pn] = -90 * ol;
    pathb[pn] = 10000 - 30 * ol;

    if (opts.indexOf("p") >= 0) patha[pn] -= 180 * ol;
    if (opts.indexOf("a") >= 0) patha[pn] += 90 * ol;
    if (opts.indexOf("h") >= 0) {
        if (e == 50) pathf[pn] += 20000; else pathf[pn] += 10000;
    }

    dancer[i].pn = pn + 1;
}

function swing(i, mw, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // "f" must start facing each other (so that ends don't join in with allemande)
    // "h" ends on a hotspot
    // "u" ones face down, twos face up
    // "d" face diagonal left
    // "e" face diagonal right
    // "y" all face down
    // "s" end ready for a star left
    // "r" end ready for a star right
    // "3","4" end distance 30,40
    // "a" end facing across (default)

    var e, t, md, me, mt, d, od, oy, u, pn, oa, a2, a, j, oe, os, or, oh;

    od = opts.indexOf("d") >= 0;
    oe = opts.indexOf("e") >= 0;
    oy = opts.indexOf("y") >= 0;
    os = opts.indexOf("s") >= 0;
    or = opts.indexOf("r") >= 0;
    oh = opts.indexOf("h") >= 0;

    e = 50;
    if (opts.indexOf("3") >= 0) e = 30;
    if (opts.indexOf("4") >= 0) e = 40;
    if (oy) e = 37.5;

    t = 16 - (Math.round(beat / 10) % 16);

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;
    findset(i, "g"); // start facing each other
    if (dancer[i].p >= 0) oa = false;
    else if (opts.indexOf("f") < 0) { // start from allemande
        findset(i, "b");
        if (dancer[i].p >= 0) oa = true;
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t);
        return;
    }
    dancer[i].e = false;

    if (t <= 8) a = 720; else a = 1080;
    a2 = dancer[i].a;
    while (a2 < -45) a2 += 360;
    while (a2 >= 315) a2 -= 360;
    a2 = Math.round(a2 / 90) * 90;
    if (opts.indexOf("u") >= 0) {
        if ((dancer[i].s == man) && (dancer[i].t == 1)) a2 += 180;
        if ((dancer[i].s == woman) && (dancer[i].t == 2)) a2 += 180;
    }
    else if (oy) {
        if (dancer[i].s == man) a2 += 180;
    }
    else {
        a2 += 90;
        if ((dancer[i].s == man) && (dancer[i].y > 0)) a2 += 180;
        if ((dancer[i].s == woman) && (dancer[i].y < 0)) a2 += 180;
    }
    if (oa) a2 += 270;
    while (a2 < 0) a2 += 360;
    while (a2 >= 360) a2 -= 360;
    a += a2;

    if (od) {
        if (dancer[i].y < 0) {
            od = false;
            for (j = 0; j <= topdancer; j++) if ((j != dancer[i].p) && (dancer[j].y < 0) && (dancer[j].x > (dancer[i].x + 10))) od = true;
        }
        if (dancer[i].y > 0) {
            od = false;
            for (j = 0; j <= topdancer; j++) if ((j != dancer[i].p) && (dancer[j].y > 0) && (dancer[j].x < (dancer[i].x - 10))) od = true;
        }
    }
    if (oe) {
        if (dancer[i].y > 0) {
            oe = false;
            for (j = 0; j <= topdancer; j++) if ((j != dancer[i].p) && (dancer[j].y > 0) && (dancer[j].x > (dancer[i].x + 10))) oe = true;
        }
        if (dancer[i].y < 0) {
            oe = false;
            for (j = 0; j <= topdancer; j++) if ((j != dancer[i].p) && (dancer[j].y < 0) && (dancer[j].x < (dancer[i].x - 10))) oe = true;
        }
    }

    d = Math.round(dis(i, dancer[i].p) / 2);
    mt = (a - 180) / 3 + Math.sqrt(d * d + 400) + Math.sqrt(e * e + 400);
    md = Math.round(Math.sqrt(d * d + 400) / mt * t * 10);
    me = Math.round(Math.sqrt(e * e + 400) / mt * t * 10);

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (dancer[i].s == man) {
        if (oa) { // from allemande
            pn++;
            patht[pn] = md;
            pathf[pn] = 20;
            paths[pn] = d;
            patha[pn] = -25 - 90;
            pathb[pn] = 10000 - 40;
            pn++;
            patht[pn] = t * 10 - md - me;
            pathf[pn] = 0;
            paths[pn] = d;
            patha[pn] = -a + 180;
            pathb[pn] = -a + 180;
            pathr[pn] = "sw";
            pn++;
            patht[pn] = me;
            pathf[pn] = e * Math.sin(a * rpd);
            paths[pn] = d - e * Math.cos(a * rpd);
            patha[pn] = -65;
            pathb[pn] = 10000 - 30;
        }
        else { // from facing each other
            pn++;
            patht[pn] = md;
            pathf[pn] = d;
            paths[pn] = -20;
            patha[pn] = -25;
            pathb[pn] = 10000 - 30;
            pn++;
            patht[pn] = t * 10 - md - me;
            pathf[pn] = d;
            paths[pn] = 0;
            patha[pn] = -a + 180;
            pathb[pn] = -a + 180;
            pathr[pn] = "sw";
            pn++;
            patht[pn] = me;
            pathf[pn] = d - e * Math.cos(a * rpd);
            paths[pn] = -e * Math.sin(a * rpd);
            patha[pn] = -65;
            pathb[pn] = 10000 - 30;
        }
        if (os) patha[pn] -= 90;
    }
    else {
        if (oa) {
            pn++;
            patht[pn] = md;
            pathf[pn] = 20;
            paths[pn] = d;
            patha[pn] = -25 - 90;
            pathb[pn] = 10000 - 40;
            pn++;
            patht[pn] = t * 10 - md - me;
            pathf[pn] = 0;
            paths[pn] = d;
            patha[pn] = -a + 180;
            pathb[pn] = -a + 180;
            pathr[pn] = "sw";
            pn++;
            patht[pn] = me;
            pathf[pn] = e * Math.sin(a * rpd);
            paths[pn] = d - e * Math.cos(a * rpd);
            patha[pn] = -245;
            pathb[pn] = 10000 - 30;
        }
        else {
            pn++;
            patht[pn] = md;
            pathf[pn] = d;
            paths[pn] = -20;
            patha[pn] = -25;
            pathb[pn] = 10000 - 30;
            pn++;
            patht[pn] = t * 10 - md - me;
            pathf[pn] = d;
            paths[pn] = 0;
            patha[pn] = -a + 180;
            pathb[pn] = -a + 180;
            pathr[pn] = "sw";
            pn++;
            patht[pn] = me;
            pathf[pn] = d - e * Math.cos(a * rpd);
            paths[pn] = -e * Math.sin(a * rpd);
            patha[pn] = -245;
            pathb[pn] = 10000 - 30;
        }
        if (or) patha[pn] += 90;
    }
    if (od) pathf[pn] += 30000;
    else if (oe) pathf[pn] += 40000;
    else if (oy) pathf[pn] += 60000;
    else if (oh) {
        if (e == 50) pathf[pn] += 20000; else pathf[pn] += 10000;
    }

    dancer[i].pn = pn + 1;
}

function orbit(i, mw, opts) {
    // mw is 2
    // "r" double orbit from a wave with 1/2 allemandes as in Reel to Reel
    // from improper as in Amy's Harmonium
    // "l" start with ladies on the left
    var pn, or;

    or = opts.indexOf("r") >= 0;
    ol = opts.indexOf("l") >= 0;

    if (or) {
        findset(i, "w");
        t = 16;
    }
    else {
        findset(i, "r");
        t = 6;
    }
    if (dancer[i].p < 0) {
        atend(i, mw, t + 100);
        return;
    }
    dancer[i].e = false;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if ((!or) && (xor(dancer[i].s == man, ol))) {
        pn++;
        patht[pn] = 20;
        pathf[pn] = 100;
        paths[pn] = -30;
        patha[pn] = 0;
        pathb[pn] = 10000 - 30;
        pn++;
        patht[pn] = 32;
        pathf[pn] = 100;
        paths[pn] = 45;
        patha[pn] = -180;
        pathb[pn] = -180;
        pn++;
        patht[pn] = 8;
        pathf[pn] = 50;
        paths[pn] = 120;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    else if (!or) {
        pn++;
        patht[pn] = 20;
        pathf[pn] = 50;
        paths[pn] = -20;
        patha[pn] = 0;
        pathb[pn] = 10000 - 20;
        pn++;
        patht[pn] = 40;
        pathf[pn] = 50;
        paths[pn] = -50;
        patha[pn] = 360;
        pathb[pn] = 360;
    }
    else {
        pn++;
        patht[pn] = 3;
        pathf[pn] = 17;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        pn++;
        patht[pn] = -3;
        pn++;
        patht[pn] = 17;
        pathf[pn] = 0;
        paths[pn] = 37.5;
        patha[pn] = -180;
        pathb[pn] = -180;
        pn++;
        patht[pn] = -3;

        if (xor(dancer[i].s == man, ol)) {
            pn++;
            patht[pn] = 60;
            pathf[pn] = 0;
            paths[pn] = -37.5;
            patha[pn] = 360;
            pathb[pn] = 360;
        }
        else {
            pn++;
            patht[pn] = 5;
            pathf[pn] = 20;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 50;
            pathf[pn] = 20;
            paths[pn] = 112.5;
            patha[pn] = -180;
            pathb[pn] = -180;
            pn++;
            patht[pn] = 5;
            pathf[pn] = 0;
            paths[pn] = 225;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
        pn++;
        patht[pn] = -3;

        pn++;
        patht[pn] = 20;
        pathf[pn] = 0;
        paths[pn] = 37.5;
        patha[pn] = -180;
        pathb[pn] = -180;
        pn++;
        patht[pn] = -3;
        if (xor(dancer[i].s == woman, ol)) {
            pn++;
            patht[pn] = 60;
            pathf[pn] = 0;
            paths[pn] = -37.5;
            patha[pn] = 360;
            pathb[pn] = 360;
        }
        else {
            pn++;
            patht[pn] = 5;
            pathf[pn] = 20;
            paths[pn] = 0;
            patha[pn] = 0;
            pathb[pn] = 0;
            pn++;
            patht[pn] = 50;
            pathf[pn] = 20;
            paths[pn] = 112.5;
            patha[pn] = -180;
            pathb[pn] = -180;
            pn++;
            patht[pn] = 5;
            pathf[pn] = 0;
            paths[pn] = 225;
            patha[pn] = 0;
            pathb[pn] = 0;
        }
        pn++;
        patht[pn] = -3;
    }

    dancer[i].pn = pn + 1;
}

function balancerotate(i, mw, opts) {
    // mw = 2
    // "u" turn to face up/down
    var f, pn, ou;

    ou = opts.indexOf("u") >= 0;

    findset(i, "w");
    if (dancer[i].p < 0) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    f = 25;
    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = f;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = f;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;

    if (Math.abs(dancer[i].y) <= 50) {
        pn++;
        patht[pn] = 40;
        pathf[pn] = 17;
        paths[pn] = 50;
        patha[pn] = -180;
        pathb[pn] = -180;
        if (ou) {
            patht[pn] = 34;
            pn++;
            patht[pn] = 6;
            pathf[pn] = 17;
            paths[pn] = 100;
            patha[pn] = -90;
            pathb[pn] = 0;
        }
    }
    else {
        pn++;
        patht[pn] = 40;
        pathf[pn] = 100;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
        if (ou) {
            patht[pn] = 34;
            pn++;
            patht[pn] = 6;
            pathf[pn] = 117;
            paths[pn] = 0;
            patha[pn] = -90;
            pathb[pn] = 0;
        }
    }

    dancer[i].pn = pn + 1;
}

function balanceslide(i, mw, d, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // "e" with ends
    // "p" turn to progress
    // "i" turn to face back
    // "c" move forward to center
    // "s" same sex wave
    var f, u, pn, oe, os;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    os = opts.indexOf("s") >= 0;
    oe = opts.indexOf("e") >= 0;
    f = Math.round(normalangle(dancer[i].a, 0) / 45);
    if ((f == 2) || (f == 6)) oe = false;

    if (!os) {
        if (d > 0) findset(i, "w"); else findset(i, "x");
    }
    else {
        if (d > 0) findset(i, "0"); else findset(i, "1");
    }

    if ((dancer[i].p < 0) && (!oe)) {
        atend(i, mw, 8);
        return;
    }
    dancer[i].e = false;

    f = 25;
    if (d < 0) f *= -1;
    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = f;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = f;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;

    if (opts.indexOf("c") >= 0) f = 17; else f = 0;

    pn++;
    patht[pn] = 40;
    pathf[pn] = f;
    paths[pn] = d;
    patha[pn] = -360;
    pathb[pn] = 10000 + 20;
    if (opts.indexOf("c") >= 0) pathb[pn] += 20;
    if (opts.indexOf("p") >= 0) patha[pn] -= 90;
    if (opts.indexOf("i") >= 0) patha[pn] += 90;
    if (d < 0) {
        patha[pn] *= -1;
        pathb[pn] = 10000 - 20;
        if (opts.indexOf("c") >= 0) pathb[pn] -= 20;
    }

    dancer[i].pn = pn + 1;
}

function balance(i, mw, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // "s" is sideways
    // "u" set of four

    var f, s, m, u, pn, ou;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    ou = opts.indexOf("u") >= 0;

    if (ou) {
        findset(i, "r");
        if (dancer[i].p < 0) findset(i, "l");
    }
    else if (opts.indexOf("s") < 0) findset(i, "g");
    else findset(i, "b");
    if (dancer[i].p < 0) {
        atend(i, mw, 4);
        return;
    }
    dancer[i].e = false;

    if (opts.indexOf("s") >= 0) {
        s = 25;
        f = 0;
    }
    else {
        s = 0;
        f = Math.round(dis(i, dancer[i].n) / 4);
    }

    pn = dancer[i].pn;
    patht[pn] = -3;

    pn++;
    patht[pn] = 10;
    pathf[pn] = f;
    paths[pn] = s;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = f;
    paths[pn] = s;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;
    pn++;
    patht[pn] = 10;
    pathf[pn] = 0;
    paths[pn] = 0;
    patha[pn] = 0;
    pathb[pn] = 0;

    if (s != 0);
    else if (!ou) {
        pathr[pn - 3] = "b1";
        pathr[pn - 2] = "b1";
        pathr[pn - 1] = "b2";
        pathr[pn] = "b2";
    }
    else if (dancer[i].s == man) {
        pathr[pn - 3] = "p1";
        pathr[pn - 2] = "p1";
        pathr[pn - 1] = "p2";
        pathr[pn] = "p2";
    }
    else {
        pathr[pn - 3] = "p3";
        pathr[pn - 2] = "p3";
        pathr[pn - 1] = "p4";
        pathr[pn] = "p4";
    }

    dancer[i].pn = pn + 1;
}

function step2(i, mw, bs, bt, mf, ms, ma, mb, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // bs is time still
    // bt is time stepping
    // mf, ms is distance, ma angle to spin, mb angle to deviate
    // "q" sync with partner for ends
    var u, pn;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    if (opts.indexOf("q") >= 0) {
        if (dancer[dancer[i].op].f) return;
        else dancer[i].e = dancer[dancer[i].op].e;
    }

    if (dancer[i].e) {
        atend(i, mw, bs + bt);
        return;
    }

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (bs > 0) {
        pn++;
        patht[pn] = bs * 10;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    if (bt > 0) {
        pn++;
        patht[pn] = bt * 10;
        pathf[pn] = mf;
        paths[pn] = ms;
        patha[pn] = ma;
        pathb[pn] = 10000 + mb;
    }

    dancer[i].pn = pn + 1;
}

function step(i, mw, bs, bt, mf, ms, ma, opts) {
    // mw 0 men, 1 women, 2 both, 10 1 men, 11 1 women, 12 1s, 20 2 men, 21 2 women, 22 2s
    // bs is time still
    // bt is time stepping
    // mf, ms is distance, ma angle to spin
    // "t" turn instead of step
    // "q" sync with partner for ends
    var u, pn, mb;

    u = mw % 10;
    if ((u < 2) && (dancer[i].s != u)) return;
    u = Math.floor(mw / 10);
    if ((u >= 1) && (dancer[i].t != u)) return;

    if (opts.indexOf("q") >= 0) {
        if (dancer[dancer[i].op].f) return;
        else dancer[i].e = dancer[dancer[i].op].e;
    }

    if (dancer[i].e) {
        atend(i, mw, bs + bt);
        return;
    }

    if (opts.indexOf("t") >= 0) mb = ma; else mb = 0;

    pn = dancer[i].pn;
    patht[pn] = -3;

    if (bs > 0) {
        pn++;
        patht[pn] = bs * 10;
        pathf[pn] = 0;
        paths[pn] = 0;
        patha[pn] = 0;
        pathb[pn] = 0;
    }
    if (bt > 0) {
        pn++;
        patht[pn] = bt * 10;
        pathf[pn] = mf;
        paths[pn] = ms;
        patha[pn] = ma;
        pathb[pn] = mb;
    }

    dancer[i].pn = pn + 1;
}

function drawmark(dx, dy) {
    var x, y;
    x = (dx + callerx) * dsp / 100;
    y = (dy + callery) * dsp / 100;
    ctx.translate(x, y);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-2, -2, 5, 5);
    ctx.translate(-x, -y);
}

//aaaaaaa

function dlistsort(a, b) {
    if (a.d0 > b.d0) return -1;
    else if (a.d0 < b.d0) return 1;
    else if (a.d1 > b.d1) return -1;
    else if (a.d1 < b.d1) return 1;
    else return 0;
}

function finish3d() {
    var i;

    dlist.sort(dlistsort);

    for (i = 0; i <= dlistn; i++) if (dlist[i].t == 0) { // surface
        ctx.fillStyle = torgb(dlist[i].c);
        ctx.beginPath();
        ctx.moveTo(dlist[i].x1, dlist[i].y1);
        ctx.lineTo(dlist[i].x2, dlist[i].y2);
        ctx.lineTo(dlist[i].x3, dlist[i].y3);
        ctx.lineTo(dlist[i].x4, dlist[i].y4);
        ctx.closePath();
        ctx.fill();
    }
    else { // line
        ctx.strokeStyle = torgb(dlist[i].c);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(dlist[i].x1, dlist[i].y1);
        ctx.lineTo(dlist[i].x2, dlist[i].y2);
        ctx.stroke();
    }

}

function to2dpoint(t1) {
    var t, pt, pu, pf;
    pt = new Object();
    pu = new Object();
    pf = new Object();

    if (d3reset) {
        d3reset = false;
        d3cosaxy = Math.cos(d3axy * rpd);
        d3sinaxy = Math.sin(d3axy * rpd);
        d3sinaz = Math.sin(d3az * rpd);
        d3cosazc = Math.cos((90 - d3az) * rpd);
        d3sinazc = Math.sin((90 - d3az) * rpd);
        d3vw.z = d3r * d3sinaz;
        t = Math.sqrt(d3r * d3r - d3vw.z * d3vw.z);
        d3vw.x = t * d3sinaxy;
        d3vw.y = -t * d3cosaxy;
    }

    pt.x = (t1.x - d3x) * d3cosaxy + (t1.y - d3y) * d3sinaxy;
    pt.y = -(t1.x - d3x) * d3sinaxy + (t1.y - d3y) * d3cosaxy;
    pt.z = t1.z;

    pu.x = pt.x;
    pu.y = pt.y * d3cosazc + pt.z * d3sinazc;
    pu.z = -pt.y * d3sinazc + pt.z * d3cosazc;

    pf.x = pu.x * d3r / (d3r - pu.z) + d3x;
    pf.y = pu.y * d3r / (d3r - pu.z) + d3y;

    return pf;
}

function draw3dline(x1, y1, z1, x2, y2, z2, c) {
    var p1, p2, r1, r2, d1, d2, d0;
    p1 = new Object();
    p2 = new Object();
    r1 = new Object();
    r2 = new Object();

    p1.x = x1;
    p1.y = -y1;
    p1.z = z1;
    p2.x = x2;
    p2.y = -y2;
    p2.z = z2;

    dsp100 = dsp / 100;
    r1 = to2dpoint(p1);
    r1.x = r1.x * dsp100 + dsp * 11;
    r1.y = yofs - r1.y * dsp100;
    r2 = to2dpoint(p2);
    r2.x = r2.x * dsp100 + dsp * 11;
    r2.y = yofs - r2.y * dsp100;

    d1 = Math.sqrt(sqr(p1.x - d3vw.x) + sqr(p1.y - d3vw.y));
    d0 = d1;
    d2 = Math.sqrt(sqr(p2.x - d3vw.x) + sqr(p2.y - d3vw.y));
    if (d2 > d0) d0 = d2;
    d1 = (d1 + d2) / 2;
    if ((p1.z + p2.z) == 0) {
        d0 += 100;
        d1 += 100;
    }

    dlistn++;
    dlist[dlistn] = new Array;
    dlist[dlistn].t = 1;
    dlist[dlistn].c = c;
    dlist[dlistn].d0 = Math.round(d0);
    dlist[dlistn].d1 = Math.round(d1);
    dlist[dlistn].x1 = r1.x;
    dlist[dlistn].y1 = r1.y;
    dlist[dlistn].x2 = r2.x;
    dlist[dlistn].y2 = r2.y;
    dlist[dlistn].x3 = 0;
    dlist[dlistn].y3 = 0;
    dlist[dlistn].x4 = 0;
    dlist[dlistn].y4 = 0;

}

function draw3dsurface(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, c) {
    var p1, p2, p3, p4, r1, r2, r3, r4, d0, d1, d2, d3, d4, cr, cg, cb, t, dsp100;
    p1 = new Object();
    p2 = new Object();
    p3 = new Object();
    p4 = new Object();
    r1 = new Object();
    r2 = new Object();
    r3 = new Object();
    r4 = new Object();

    p1.x = x1;
    p1.y = -y1;
    p1.z = z1;
    p2.x = x2;
    p2.y = -y2;
    p2.z = z2;
    p3.x = x3;
    p3.y = -y3;
    p3.z = z3;
    p4.x = x4;
    p4.y = -y4;
    p4.z = z4;

    // l = color multiplier
    // normal to surface = (t3-t1) cross (t2-t1)
    r1.x = (p2.y - p1.y) * (p3.z - p1.z) - (p2.z - p1.z) * (p3.y - p1.y);
    r1.y = (p2.z - p1.z) * (p3.x - p1.x) - (p2.x - p1.x) * (p3.z - p1.z);
    r1.z = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
    // line of sight
    r2.x = (p1.x + p2.x + p3.x + p4.x) / 4 - d3vw.x;
    r2.y = (p1.y + p2.y + p3.y + p4.y) / 4 - d3vw.y;
    r2.z = (p1.z + p2.z + p3.z + p4.z) / 4 - d3vw.z;
    // normal dot lineofsight
    t = Math.abs(r1.x * r2.x + r1.y * r2.y + r1.z * r2.z) / Math.sqrt((r1.x * r1.x + r1.y * r1.y + r1.z * r1.z) * (r2.x * r2.x + r2.y * r2.y + r2.z * r2.z));
    // multiplier
    t = t * .5 + .5;

    cb = c & 255;
    cr = c >> 8;
    cg = cr & 255;
    cr = cr >> 8;
    cr = cr & 255;
    cr = Math.round(cr * t);
    cg = Math.round(cg * t);
    cb = Math.round(cb * t);

    dsp100 = dsp / 100;
    r1 = to2dpoint(p1);
    r1.x = r1.x * dsp100 + dsp * 11;
    r1.y = yofs - r1.y * dsp100;
    r2 = to2dpoint(p2);
    r2.x = r2.x * dsp100 + dsp * 11;
    r2.y = yofs - r2.y * dsp100;
    r3 = to2dpoint(p3);
    r3.x = r3.x * dsp100 + dsp * 11;
    r3.y = yofs - r3.y * dsp100;
    r4 = to2dpoint(p4);
    r4.x = r4.x * dsp100 + dsp * 11;
    r4.y = yofs - r4.y * dsp100;

    // sort values d0, d1
    d1 = Math.sqrt(sqr(p1.x - d3vw.x) + sqr(p1.y - d3vw.y));
    d0 = d1;
    d2 = Math.sqrt(sqr(p2.x - d3vw.x) + sqr(p2.y - d3vw.y));
    if (d2 > d0) d0 = d2;
    d3 = Math.sqrt(sqr(p3.x - d3vw.x) + sqr(p3.y - d3vw.y));
    if (d3 > d0) d0 = d3;
    d4 = Math.sqrt(sqr(p4.x - d3vw.x) + sqr(p4.y - d3vw.y));
    if (d4 > d0) d0 = d4;
    d1 = (d1 + d2 + d3 + d4) / 4;
    if ((p1.z + p2.z + p3.z + p4.z) == 0) {
        d0 += 100;
        d1 += 100;
    }

    dlistn++;
    dlist[dlistn] = new Array;
    dlist[dlistn].t = 0;
    dlist[dlistn].c = (cr << 16) | (cg << 8) | cb;
    dlist[dlistn].d0 = Math.round(d0);
    dlist[dlistn].d1 = Math.round(d1);
    dlist[dlistn].x1 = r1.x;
    dlist[dlistn].y1 = r1.y;
    dlist[dlistn].x2 = r2.x;
    dlist[dlistn].y2 = r2.y;
    dlist[dlistn].x3 = r3.x;
    dlist[dlistn].y3 = r3.y;
    dlist[dlistn].x4 = r4.x;
    dlist[dlistn].y4 = r4.y;

}

function drawobject3d(x, y, a, c, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
    var t, s, x21, x22, x23, x24, y21, y22, y23, y24;
    t = Math.cos(a * rpd);
    s = Math.sin(a * rpd);
    x21 = x1 * t + y1 * s + x;
    y21 = -x1 * s + y1 * t + y;
    x22 = x2 * t + y2 * s + x;
    y22 = -x2 * s + y2 * t + y;
    x23 = x3 * t + y3 * s + x;
    y23 = -x3 * s + y3 * t + y;
    x24 = x4 * t + y4 * s + x;
    y24 = -x4 * s + y4 * t + y;
    draw3dsurface(x21, y21, z1, x22, y22, z2, x23, y23, z3, x24, y24, z4, c);
}

function drawdancer(dn, dx, dy, da, ar) {
    var x, y, lstr, whostr, dcToUse, c, i, h, h2, h15, w, aw, ah, rx, ry, lx, ly, lh, rh, al, ar2, rx2, ry2, lx2, ly2, p, o, n, op;
    //bill added o,n,op changed l to lstr 
    if (d3) {
        if (dn == -1) c = callerc; else c = dancer[dn].c3;
        h = 50;
        h2 = h * 2;
        h15 = Math.round(h * 1.5);
        w = 2;
        w2 = 10;
        aw = (w + w2) / 2;
        ah = h15;
        al = Math.round(h * 0.6);

        if ((dn == -1) || (dancer[dn].s == man)) {
            drawobject3d(dx, dy, da, c, 10, w, h2, 20, w2, h, 20, -w2, h, 10, -w, h2);
            drawobject3d(dx, dy, da, c, -10, w, h2, -20, w2, h, -20, -w2, h, -10, -w, h2);
            drawobject3d(dx, dy, da, c, 10, w, h2, 20, w2, h, -20, w2, h, -10, w, h2);
            drawobject3d(dx, dy, da, c, 10, -w, h2, 20, -w2, h, -20, -w2, h, -10, -w, h2);

            drawobject3d(dx, dy, da, c, 10, w, 0, 20, w2, h, 20, -w2, h, 10, -w, 0);
            drawobject3d(dx, dy, da, c, -10, w, 0, -20, w2, h, -20, -w2, h, -10, -w, 0);
            drawobject3d(dx, dy, da, c, 10, w, 0, 20, w2, h, -20, w2, h, -10, w, 0);
            drawobject3d(dx, dy, da, c, 10, -w, 0, 20, -w2, h, -20, -w2, h, -10, -w, 0);

            drawobject3d(dx, dy, da, c, 10, w, h2, 10, -w, h2, -10, -w, h2, -10, w, h2);

            drawobject3d(dx, dy, da, c, 0, w, h2, 0, 20, h15, 0, w + .5 * (10 + w), h15, 0, w, h2);
        }
        else {
            drawobject3d(dx, dy, da, c, 20, w, h, 10, w2, h2, 10, -w2, h2, 20, -w, h);
            drawobject3d(dx, dy, da, c, -20, w, h, -10, w2, h2, -10, -w2, h2, -20, -w, h);
            drawobject3d(dx, dy, da, c, 20, w, h, 10, w2, h2, -10, w2, h2, -20, w, h);
            drawobject3d(dx, dy, da, c, 20, -w, h, 10, -w2, h2, -10, -w2, h2, -20, -w, h);

            drawobject3d(dx, dy, da, c, 20, w, h, 10, w2, 0, 10, -w2, 0, 20, -w, h);
            drawobject3d(dx, dy, da, c, -20, w, h, -10, w2, 0, -10, -w2, 0, -20, -w, h);
            drawobject3d(dx, dy, da, c, 20, w, h, 10, w2, 0, -10, w2, 0, -20, w, h);
            drawobject3d(dx, dy, da, c, 20, -w, h, 10, -w2, 0, -10, -w2, 0, -20, -w, h);

            drawobject3d(dx, dy, da, c, 10, -w2, h2, 10, w2, h2, -10, w2, h2, -10, -w2, h2);

            drawobject3d(dx, dy, da, c, 0, w2, h2, 0, 20, h15, 0, w + .5 * (10 + w), h15, 0, w2, h2);
        }

        if (showarms) {

            ar2 = new Array();
            if (ar == "") {
                ar2[0] = "";
                ar2[1] = "";
            }
            else {
                ar2 = ar.split(",");
                if (ar2[1] == undefined) ar2[1] = ar2[0];
            }

            if (ar2[0] == "") {
                rx = 0;
                ry = 0;
                lx = 0;
                ly = 0;
            }
            else if (ar2[0] == "ar") {
                rx = 30;
                ry = 0;
                lx = 0;
                ly = 0;
            }
            else if (ar2[0] == "al") {
                lx = 30;
                ly = 0;
                rx = 0;
                ry = 0;
            }
            else if (ar2[0] == "sr") {
                rx = 50;
                ry = 0;
                lx = 0;
                ly = 0;
            }
            else if (ar2[0] == "sl") {
                lx = 50;
                ly = 0;
                rx = 0;
                ly = 0;
            }
            else if (ar2[0] == "sw") {
                rx = 55;
                ry = 0;
                lx = 15;
                ly = 20;
            }
            else if (ar2[0] == "ci") {
                rx = 37;
                ry = 37;
                lx = 37;
                ly = 37;
            }
            else if (ar2[0] == "li") {
                rx = 50;
                ry = 0;
                lx = 50;
                ly = 0;
            }
            else if (ar2[0] == "b1") {
                rx = 20;
                ry = 25;
                lx = 20;
                ly = 25;
            }
            else if (ar2[0] == "b2") {
                rx = 20;
                ry = 50;
                lx = 20;
                ly = 50;
            }

            else if (ar2[0] == "p1") {
                rx = 50;
                ry = 0;
                lx = 20;
                ly = 25;
            }
            else if (ar2[0] == "p2") {
                rx = 50;
                ry = 0;
                lx = 20;
                ly = 50;
            }
            else if (ar2[0] == "p3") {
                lx = 50;
                ly = 0;
                rx = 20;
                ry = 25;
            }
            else if (ar2[0] == "p4") {
                lx = 50;
                ly = 0;
                rx = 20;
                ry = 50;
            }
            else {
                rx = 0;
                ry = 0;
                lx = 0;
                ly = 0;
            }

            if (ar2[0] != ar2[1]) { // interpolate
                if (ar2[1] == "") {
                    rx2 = 0;
                    ry2 = 0;
                    lx2 = 0;
                    ly2 = 0;
                }
                else if (ar2[1] == "ar") {
                    rx2 = 30;
                    ry2 = 0;
                    lx2 = 0;
                    ly2 = 0;
                }
                else if (ar2[1] == "al") {
                    lx2 = 30;
                    ly2 = 0;
                    rx2 = 0;
                    ry2 = 0;
                }
                else if (ar2[1] == "sr") {
                    rx2 = 50;
                    ry2 = 0;
                    lx2 = 0;
                    ly2 = 0;
                }
                else if (ar2[1] == "sl") {
                    lx2 = 50;
                    ly2 = 0;
                    rx2 = 0;
                    ly2 = 0;
                }
                else if (ar2[1] == "sw") {
                    rx2 = 55;
                    ry2 = 0;
                    lx2 = 15;
                    ly2 = 20;
                }
                else if (ar2[1] == "ci") {
                    rx2 = 37;
                    ry2 = 37;
                    lx2 = 37;
                    ly2 = 37;
                }
                else if (ar2[1] == "li") {
                    rx2 = 50;
                    ry2 = 0;
                    lx2 = 50;
                    ly2 = 0;
                }
                else if (ar2[1] == "b1") {
                    rx2 = 20;
                    ry2 = 25;
                    lx2 = 20;
                    ly2 = 25;
                }
                else if (ar2[1] == "b2") {
                    rx2 = 20;
                    ry2 = 50;
                    lx2 = 20;
                    ly2 = 50;
                }

                else if (ar2[1] == "p1") {
                    rx2 = 50;
                    ry2 = 0;
                    lx2 = 20;
                    ly2 = 25;
                }
                else if (ar2[1] == "p2") {
                    rx2 = 50;
                    ry2 = 0;
                    lx2 = 20;
                    ly2 = 50;
                }
                else if (ar2[1] == "p3") {
                    lx2 = 50;
                    ly2 = 0;
                    rx2 = 20;
                    ry2 = 25;
                }
                else if (ar2[1] == "p4") {
                    lx2 = 50;
                    ly2 = 0;
                    rx2 = 20;
                    ry2 = 50;
                }
                else {
                    rx2 = 0;
                    ry2 = 0;
                    lx2 = 0;
                    ly2 = 0;
                }

                p = ar2[2];
                rx = (rx * (100 - p) + rx2 * p) / 100;
                ry = (ry * (100 - p) + ry2 * p) / 100;
                lx = (lx * (100 - p) + lx2 * p) / 100;
                ly = (ly * (100 - p) + ly2 * p) / 100;
            }

            rh = Math.round(ah - Math.sqrt(al * al - (rx - 15) * (rx - 15) / 4 - ry * ry / 4));
            lh = Math.round(ah - Math.sqrt(al * al - (lx - 15) * (lx - 15) / 4 - ly * ly / 4));

            if (rx != 0) {
                drawobject3d(dx, dy, da, c, -15, aw, ah, -15, -aw, ah, -(rx + 15) / 2, ry / 2 - w, rh, -(rx + 15) / 2, ry / 2 + w, rh);
                drawobject3d(dx, dy, da, c, -rx, ry + aw, ah, -rx, ry - aw, ah, -(rx + 15) / 2, ry / 2 - w, rh, -(rx + 15) / 2, ry / 2 + w, rh);
            }
            if (lx != 0) {
                drawobject3d(dx, dy, da, c, 15, aw, ah, 15, -aw, ah, (lx + 15) / 2, ly / 2 - w, lh, (lx + 15) / 2, ly / 2 + w, lh);
                drawobject3d(dx, dy, da, c, lx, ly + aw, ah, lx, ly - aw, ah, (lx + 15) / 2, ly / 2 - w, lh, (lx + 15) / 2, ly / 2 + w, lh);
            }
        }

        i = beat % 10;
        if ((dn >= 0) && (dancer[dn].s == woman));
        else if ((dn >= 0) || (i <= 5)) drawobject3d(dx, dy, da, c, 10, 10, 0, -10, 10, 0, -10, -10, 0, 10, -10, 0);
        else { // caller taps his foot
            drawobject3d(dx, dy, da, c, -10, 10, i - 5, 10, 10, i - 5, 10, 0, 0, -10, 0, 0);
            drawobject3d(dx, dy, da, c, -10, -10, 0, 10, -10, 0, 10, 0, 0, -10, 0, 0);
        }
    }
    else { //2d
        x = (dx + callerx) * dsp / 100;
        y = (dy + callery) * dsp / 100 + yofs - Math.round(dsp * 1.5);
        ctx.translate(x, y);
        ctx.rotate(-da * rpd);
        if (dn == -1) {
            ctx.fillStyle = torgb(callerc); // the caller
        }
        else if ((dn >>> 1) == (dancertoinspect >>> 1)) {
            ctx.fillStyle = (dancer[dn].s == man) ? torgb(dcm0) : torgb(dcw0);
        }
        else {
            ctx.fillStyle = torgb(dancer[dn].c);
        }
        ;

        ctx.fillRect(-dw / 2 + dt / 2, -dt / 2, dw - dt, dt); //rect
        ctx.beginPath();
        ctx.arc(-dw / 2 + dt / 2, 0, dt / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill(); //round end
        ctx.beginPath();
        ctx.arc(dw / 2 - dt / 2, 0, dt / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill(); //round end
        ctx.beginPath();
        ctx.moveTo(dh, 0);
        ctx.lineTo(0, dh * 1.4);
        ctx.lineTo(-dh, 0);
        ctx.closePath();
        ctx.fill(); //nose
        // find p,op,n and o of the selecteddancer will color central hump of these, 
        // if same dancer is more than one  then leftmost has priority
        // note if p=-1 the caller will get a red dot :-)
        p = dancer[dancertoinspect].p;
        n = dancer[dancertoinspect].n;
        o = dancer[dancertoinspect].o;
        op = dancer[dancertoinspect].op;
        if (dn == p) {
            ctx.fillStyle = torgb(dcSelp);
        }
        //           else if (dn == op) {
        //               ctx.fillStyle = torgb(dcSelop);
        //           }
        else if (dn == n) {
            ctx.fillStyle = torgb(dcSeln);
        }
        else if (dn == o) {
            ctx.fillStyle = torgb(dcSelo);
        }
        ;
        ctx.beginPath();
        ctx.arc(0, 0, dh, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill(); //central bump
        ctx.rotate(da * rpd);
        if ((lb != 0) && (dn != -1)) {
            ctx.font = ftd;
            ctx.fillStyle = torgb(tcd);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            if (lb == 4) {
                if (dancer[dn].s == man) ctx.fillText("M" + ((dn >>> 1) + 1), 0, 0); else ctx.fillText("L" + ((dn >>> 1) + 1), 0, 0);
            }
            if (lb == 1) {
                p = dancer[dn].p;
                n = dancer[dn].n;
                o = dancer[dn].o;
                op = dancer[dn].op;
                if (dancer[dn].e) lstr = " e"; else lstr = "";
                whostr = "(" + op + ", " + p + ", " + o + ", " + n + ")";
                if (dancer[dn].s == man) ctx.fillText(dancer[dn].t + "m " + dn + lstr, 0, 0);
                else ctx.fillText(dancer[dn].t + "w " + dn + lstr, 0, 0);
                ctx.fillText(whostr, 0, 12);
            }
            if (lb == 2) ctx.fillText("a " + Math.round(da), 0, 0);
            if (lb == 3) ctx.fillText("xy " + Math.round(dx) + " " + Math.round(dy), 0, 0);
        }
        ctx.translate(-x, -y);
    }
}

function drawfloor() {
    var i;
    ctx.fillStyle = "#49d";
    ctx.fillRect(0, 0, 1000, 500);
    dlistn = -1;
    if (d3) {
        draw3dsurface(-1100, -150, 0, -1100, 150, 0, 100, 150, 0, 100, -150, 0, fc);
        if (gd == 1) {
            for (i = -150; i <= 150; i += 25) draw3dline(-1100, i, 0, 100, i, 0, gc);
            for (i = -1100; i <= 100; i += 25) draw3dline(i, -150, 0, i, 150, 0, gc);
        }
    }
    else {
        ctx.fillStyle = torgb(fc);
        ctx.strokeStyle = torgb(gc);
        ctx.fillRect(0, yofs - Math.round(dsp * 1.5), 12 * dsp, dsp * 3);
        if (gd == 1) {
            for (i = 0; i <= 300; i += 25) {
                ctx.beginPath();
                ctx.moveTo(0, yofs - Math.round(dsp * 1.5) + i / 100 * dsp);
                ctx.lineTo(12 * dsp, yofs - Math.round(dsp * 1.5) + i / 100 * dsp);
                ctx.closePath();
                ctx.stroke();
            }
            for (i = 0; i <= 1200; i += 25) {
                ctx.beginPath();
                ctx.moveTo(i / 100 * dsp, yofs - Math.round(dsp * 1.5));
                ctx.lineTo(i / 100 * dsp, yofs + Math.round(dsp * 1.5));
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
    drawdancer(-1, 50, 0, -90, "b1"); //bill drawing the caller
}

function drawtitle() {
    var i, a;
    ctx.font = ft;
    ctx.fillStyle = torgb(tc);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, 5.5 * dsp, ytofs + 1.25 * dsp);
    if (beat < 640) {
        a = "";
        i = Math.floor((640 - beat) / 10);
    }
    else {
        i = Math.floor(beat / 10) % 64;
        if (i < 16) a = "A1 - "; else if (i < 32) a = "A2 - "; else if (i < 48) a = "B1 - "; else a = "B2 - ";
    }
    ctx.fillText(a + ((i % 16) + 1), 11.5 * dsp, ytofs + 1.25 * dsp);
}

function drawall() {
    var i, j, k, ar, df, ds, da, db, de, dea, ma, mf, ms, mx, my, mb, dx, dy, mr, pt, pb, x0, x1, x2, x3, y0, y1, y2, y3, t1, t2, df2;

    t1 = new Object();
    t2 = new Object();

    if ((beat == 640) && (go == 1)) {
        clearInterval(siid);
        go = 0;
        stponepath = false;
        stp = false;
        return;
    }

    beat++;

    //bill debug
    debugout = document.getElementById("debugout");
    var beattenths = beat / 10;
    dancertoinspect = document.getElementById("whoinspect").value;
    if (isNaN(dancertoinspect)) {
        dancertoinspect = 0;
    } else {
        dancertoinspect = Math.max(0, dancertoinspect);
        dancertoinspect = Math.min(topdancer, dancertoinspect);
    }

    debugout.innerHTML = "beat = " + beattenths.toFixed(1);
    debugout.innerHTML = debugout.innerHTML
        + "<br>The ends are: " + WhoAreEnds()
        + "<br>Inspecting Dancer " + dancertoinspect
        + "<br>s=(sex)= " + dancer[dancertoinspect].s + " t=(1s or 2s)= " + dancer[dancertoinspect].t
        + "<br>c= " + torgb(dancer[dancertoinspect].c) + " c3= " + torgb(dancer[dancertoinspect].c3)
        + "<br>ar= " + dancer[dancertoinspect].ar + " arn= " + dancer[dancertoinspect].arn
        + "<br>op= " + dancer[dancertoinspect].op + " p= " + dancer[dancertoinspect].p + " o= " + dancer[dancertoinspect].o + " n= " + dancer[dancertoinspect].n + " (p=red,o=grn,n=blu)"
        + "<br>x= " + dancer[dancertoinspect].x.toFixed(2) + " y= " + dancer[dancertoinspect].y.toFixed(2) + " a= " + dancer[dancertoinspect].a.toFixed(2)
        + "<br>x0= " + dancer[dancertoinspect].x0.toFixed(2) + " y0= " + dancer[dancertoinspect].y0.toFixed(2) + " a0= " + dancer[dancertoinspect].a0.toFixed(2)
        + "<br>xc= " + dancer[dancertoinspect].xc.toFixed(2) + " yc= " + dancer[dancertoinspect].yc.toFixed(2) + " ac= " + dancer[dancertoinspect].ac.toFixed(2)
    ;
    if ((!prescanx) && ((beat & hres) == 0)) {
        drawfloor();
    }
    //bill goes thru all dancers and moves them along the path segments setup by addpath at the start of each cycle (of 64 beats == 640 beat where beat is one tenths of musical beat)
    for (i = 0; i <= topdancer; i++) {

        pathi = dancer[i].i; // index of first path segment
        pathj = dancer[i].j; // time step within segment

        ar = pathr[pathi]; //end effect??
        pt = patht[pathi]; //max time step of segment
        df = pathf[pathi]; //forward step
        ds = paths[pathi]; //sideways step
        da = patha[pathi]; //angle
        db = pathb[pathi]; //angle
        //bill
        if (i == dancertoinspect) {
            debugout.innerHTML = debugout.innerHTML
                + "<br>dancer[].i= " + pathi + " < pn= " + dancer[dancertoinspect].pn
                + " dancer[].i= " + pathj + " <= patht= " + pt
                + "<br>pathf= " + Math.round(df * 100) / 100 + " paths= " + Math.round(ds * 100) / 100 + " patha= " + da + " pathb= " + db + " pathr= " + ar
            ;
        }

        var setneworgin = false;

        if ((pt <= -3) && (pt >= -4)) { // new origin
            if (i == dancertoinspect) setneworgin = true;
            dancer[i].x0 = dancer[i].x;
            dancer[i].y0 = dancer[i].y;
            dancer[i].a0 = dancer[i].a;
            if (pt == -4) { // reangle, reorigin
                null;
                dancer[i].a0 += db; //bill changed from pb
                if ((df != 0) || (ds != 0)) {
                    mb = dancer[i].a0 * rpd;
                    x0 = dancer[i].y0 * Math.sin(mb) - dancer[i].x0 * Math.cos(mb);
                    y0 = dancer[i].y0 * Math.cos(mb) + dancer[i].x0 * Math.sin(mb);
                    x0 += ds;
                    y0 += df;
                    dancer[i].y0 = x0 * Math.sin(mb) + y0 * Math.cos(mb);
                    dancer[i].x0 = -x0 * Math.cos(mb) + y0 * Math.sin(mb);
                }
            }
            pathi++;
        }


        ar = pathr[pathi];
        pt = patht[pathi];
        df = pathf[pathi];
        ds = paths[pathi];
        da = patha[pathi];
        db = pathb[pathi];
        //bill
        if (i == dancertoinspect) {
            if (setneworgin) {
                debugout.innerHTML = debugout.innerHTML
                    + "<br>New Origin and/or angle: " + "pathi= " + pathi
                ;
                if (stponepath && (go != 0)) {
                    clearInterval(siid);
                    go = 0;
                    stponepath = false;
                }
            } else {
                debugout.innerHTML = debugout.innerHTML + "<br> ";
            }
        }
        if (pathj >= pt) de = 1.0; else de = pathj / pt;
        if (pt <= 10) dea = de; else if (pathj <= 9) dea = pathj / 10; else dea = 1.0;

        // substitutions

        if (df >= 9000) { // shift df,ds to hotspot
            // 10000 - y = +/- 50
            // 20000 - x round to 100, y = +/- 50
            // 30000 - left diagonal
            // 40000 - right diagonal
            // 50000 - x,y round to 50
            // 60000 - x round to 50,      y +/- 37.5/112.5 down the hall
            // 70000 - x round to 50+/-17, y +/- 37.5/112.5 wave across
            // 80000 - left diagonal lol

            df2 = Math.round(df / 10000);
            df -= df2 * 10000; // makes df2 the flag 1,..,8 and df back to small number

            mb = dancer[i].a0 * rpd;
            x0 = df * Math.sin(mb) - ds * Math.cos(mb);
            y0 = df * Math.cos(mb) + ds * Math.sin(mb);
            x0 += dancer[i].x0;
            y0 += dancer[i].y0;

            if (df2 == 1) { // y = +/- 50
                x1 = x0;
                if (y0 >= 0) y1 = 50; else y1 = -50;
                if (i == dancertoinspect) {
                    debugout.innerHTML = debugout.innerHTML + "y rounded to +/-50 ";
                }
            }
            if (df2 == 2) { // x round to 100, y = +/- 50
                x1 = Math.round(x0 / 100) * 100;
                if (y0 >= 0) y1 = 50; else y1 = -50;
                if (i == dancertoinspect) {
                    debugout.innerHTML = debugout.innerHTML + "x rounded to 100s. y rounded to +/-50 ";
                }
            }
            if (df2 == 3) { // left diagonal
                da += 45;
                x1 = Math.round(x0 / 100) * 100;
                if (y0 >= 0) y1 = 50; else y1 = -50;
                if (y1 >= 0) {
                    if (dancer[i].s == woman) x1 -= 50; else y1 += 50;
                }
                else {
                    if (dancer[i].s == woman) x1 += 50; else y1 -= 50;
                }
                if (i == dancertoinspect) {
                    debugout.innerHTML = debugout.innerHTML + "x rounded to left diagonal ";
                }
            }
            if (df2 == 4) { // right diagonal
                da -= 45;
                x1 = Math.round(x0 / 100) * 100;
                if (y0 >= 0) y1 = 50; else y1 = -50;
                if (y1 >= 0) {
                    if (dancer[i].s == man) x1 += 50; else y1 += 50;
                }
                else {
                    if (dancer[i].s == man) x1 -= 50; else y1 -= 50;
                }
                if (i == dancertoinspect) {
                    debugout.innerHTML = debugout.innerHTML + "x rounded to right diagonal ";
                }
            }
            if (df2 == 5) { // x,y round to 50
                x1 = Math.round(x0 / 50) * 50;
                y1 = Math.round(y0 / 50) * 50;
                if (i == dancertoinspect) {
                    debugout.innerHTML = debugout.innerHTML + "x,y rounded to nearest 50s ";
                }
            }
            if (df2 == 6) { // x round to 50, y +/- 37.5/112.5 down the hall
                x1 = Math.round(x0 / 50) * 50;
                if (y0 <= -75) y1 = -112.5; else if (y0 >= 75) y1 = 112.5; else if (y0 <= 0) y1 = -37.5; else y1 = 37.5;
                if (i == dancertoinspect) {
                    debugout.innerHTML = debugout.innerHTML + "x rounded to nearest 50s, y for down the hall ";
                }
            }
            if (df2 == 7) { // x round to 50+/-17, y +/- 37.5/112.5 wave across
                x1 = Math.round(x0 / 50) * 50;
                if (x0 < x1) x1 -= 17; else x1 += 17;
                if (y0 <= -75) y1 = -112.5; else if (y0 >= 75) y1 = 112.5; else if (y0 <= 0) y1 = -37.5; else y1 = 37.5;
                if (i == dancertoinspect) {
                    debugout.innerHTML = debugout.innerHTML + "x,y adjusted for waves across ";
                }
            }
            if (df2 == 8) { // left diagonal lol
                da += 45;
                x1 = Math.round(x0 / 100) * 100;
                if (y0 >= 0) y1 = 50; else y1 = -50;
                if (y1 >= 0) {
                    if (dancer[i].s == man) x1 -= 50; else y1 += 50;
                }
                else {
                    if (dancer[i].s == man) x1 += 50; else y1 -= 50;
                }
                if (i == dancertoinspect) {
                    debugout.innerHTML = debugout.innerHTML + "<left diagonal with lady on left ";
                }
            }

            x1 -= dancer[i].x0;
            y1 -= dancer[i].y0;
            df = x1 * Math.sin(mb) + y1 * Math.cos(mb);
            ds = -x1 * Math.cos(mb) + y1 * Math.sin(mb);
        }

        if (db >= 9000) { // replace path segment with arc
            mb = dancer[i].a0 * rpd;
            x1 = dancer[i].x - dancer[i].x0;
            y1 = dancer[i].y - dancer[i].y0;
            mx = y1 * Math.sin(mb) - x1 * Math.cos(mb);
            my = y1 * Math.cos(mb) + x1 * Math.sin(mb);
            x1 = mx;
            y1 = my;
            x3 = ds;
            y3 = df;
            x2 = (9 * x1 + x3) / 10;
            y2 = (9 * y1 + y3) / 10;
            mr = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            ma = Math.atan2(y2 - y1, x2 - x1) - (db - 10000) * rpd;
            x2 = mr * Math.cos(ma) + x1;
            y2 = mr * Math.sin(ma) + y1;
            ds = cirx(x1, y1, x2, y2, x3, y3);
            df = ciry(x1, y1, x2, y2, x3, y3);
            db = cira(x1, y1, x2, y2, x3, y3);
            if (i == dancertoinspect) {
                debugout.innerHTML = debugout.innerHTML + " - path replaced by arc ";
            }
        }

        // calculate position, angle shift
        if (db == 0) { // linear
            mb = dancer[i].a0 * rpd;
            mx = df * Math.sin(mb) - ds * Math.cos(mb);
            my = df * Math.cos(mb) + ds * Math.sin(mb);
            mx -= dancer[i].x - dancer[i].x0;
            my -= dancer[i].y - dancer[i].y0;
            mx *= de;
            my *= de;
            if (i == dancertoinspect) {
                debugout.innerHTML = debugout.innerHTML + " - linear ";
            }
        } else { // arc
            mb = -dancer[i].a0 * rpd;
            dx = dancer[i].x - dancer[i].x0;
            dy = dancer[i].y - dancer[i].y0;
            mx = -dx * Math.sin(mb) + dy * Math.cos(mb);
            my = -dx * Math.cos(mb) - dy * Math.sin(mb);
            df -= mx;
            ds -= my;
            ma = Math.atan2(ds, df) - db * de * rpd;
            mr = Math.sqrt(ds * ds + df * df);
            mf = df - mr * Math.cos(ma);
            ms = ds - mr * Math.sin(ma);
            df = mf;
            ds = ms;
            mb = dancer[i].a0 * rpd;
            mx = df * Math.sin(mb) - ds * Math.cos(mb);
            my = df * Math.cos(mb) + ds * Math.sin(mb);
            if (i == dancertoinspect) {
                debugout.innerHTML = debugout.innerHTML + " - arc ";
            }
        }
        if (Math.abs(da) < 9000) { // angle is divided over the entire segment
            ma = da * de;
        } else if (Math.abs(da) < 90000) { // angle is executed over the first 1/mb of the segment
            mb = Math.round(da / 10000);
            da -= 10000 * mb;
            if (de >= (1 / mb - 0.0001)) ma = da; else ma = da * de * mb;
        } else { // angle is executed over the last 1/mb of the segment
            mb = Math.round(da / 100000);
            da -= 100000 * mb;
            if (de < ((mb - 1) / mb)) ma = 0; else ma = da * (de - (mb - 1) / mb) * mb;
            if (de >= 0.9999) ma = da;
        }

        // Draw the dancer now
        dancer[i].xc = dancer[i].x + mx;
        dancer[i].yc = dancer[i].y + my;
        dancer[i].ac = dancer[i].a + ma;
        dancer[i].arn = ar;
        if ((!prescanx) && ((beat & hres) == 0)) {
            drawdancer(i, dancer[i].xc, dancer[i].yc, dancer[i].ac, dancer[i].ar + "," + dancer[i].arn + "," + Math.round(dea * 100));
            if (i == dancertoinspect) {
                debugout.innerHTML = debugout.innerHTML + "<br>after substitutions call drawdancer(i,xc,yc,ac,ar) as "
                    + "<br>drawdancer(" + i + ", " + dancer[i].xc.toFixed(2)
                    + " , " + dancer[i].yc.toFixed(2)
                    + ", " + dancer[i].ac.toFixed(2)
                    + ". " + dancer[i].ar + ", " + dancer[i].arn + ", " + Math.round(dea * 100)
                    + " )";
            }
        }
        if (i == tn) { // trail
            tx[tr] = dancer[i].xc;
            ty[tr] = dancer[i].yc;
            if (ts < tr) ts = tr;
            tr++;
            if (tr == cycle) tr = 0;
        }
        //bill here is where properties x,y,a of the dancers are updated!
        if (de >= .9999) { // finished a line of the path
            dancer[i].x += mx;
            dancer[i].y += my;
            dancer[i].a += ma;
            while (dancer[i].a > 360) dancer[i].a -= 360;
            while (dancer[i].a < -360) dancer[i].a += 360;
            dancer[i].ar = ar;
        }

        // increment time step
        pathj++;
        if (pathj > pt) { //end of path segment
            pathj = 1;
            pathi++;
            //bill
            if ((i == dancertoinspect) && stponepath && (go != 0)) {
                clearInterval(siid);
                go = 0;
                stponepath = false;
            }
        }

        dancer[i].i = pathi;
        dancer[i].j = pathj;
        //bill have dancer keep track of its finished state
        dancer[i].f = (pathi >= dancer[i].pn);
    }

    finish3d();
    drawtitle();

    // draw trail
    if (tn >= 0)
        if (!d3) {
            ctx.fillStyle = "#ffffff";
            for (i = 0; i < ts; i++) ctx.fillRect((tx[i] + callerx) * dsp / 100, yofs - 120 + (ty[i] + callery) * dsp / 100, 1, 1);
        }
        else {
            ctx.fillStyle = "#ffffff";
            for (i = 0; i < ts; i++) {
                t1.x = tx[i];
                t1.y = -ty[i];
                t1.z = 0;
                t2 = to2dpoint(t1);
                ctx.fillRect(t2.x * dsp / 100 + dsp * 11, yofs - t2.y * dsp / 100, 1, 1);
            }
        }

    //bill Update all dancers paths. Note: if dancers are not all in sync i.e. some have paths of different lengths
    // then those will NOT have the coreect properties .x .y .a which get fixed only when paths are finished. 
    //Better to do when ALL dancers have finished their path segments
    //    Done when the top dancer has finished doing all of her path segments
    if (dancer[topdancer].i >= dancer[topdancer].pn) {
        //bill for handling end effects
        if ((beat > 640 * 5) && (endoptsdone == 2)) {
            // endopts are done, propogate to provide for each figure
            for (j = 2; p[j].indexOf("reset") < 0; j++) i = j;
            for (j = i; j >= 2; j--) {
                if (p[j].indexOf("endopts=") >= 0) { // found an endopt to propogate (endopts= "." with space)
                    for (k = j == 2 ? i : j - 1; p[k].indexOf("endopts") < 0; k = k == 2 ? i : k - 1) p[k] = "endopts =\"" + p[j].substr(10, 1) + " \"; " + p[k];
                }
            }
            endoptsdone = 1;
        }
        // bill set up new path segments for next cycle (i.e. next call) in all dancers 
        for (j = 0; j <= topdancer * 50 + 49; j++) pathr[j] = "";
        cyn = cynnext;
        setcynnext();
        //bill don't understand why this would replace the five loops below
        //            for (j = 0; j <= topdancer; j++) {
        //                dancer[j].i = j * 50;
        //                dancer[j].pn = j * 50;
        //                dancer[j].j = 1;
        //                addpath(j);
        //            }
        // This seems to add the path segments in a differnt order, first all with dancer[].e true, then
        // if path actually added, prevent from trying again, then try rest again twice
        // it first tries adding paths for end dancers twice
        // then tries adding path segments for remaining dancers, and if it fails the first time will try a second. 
        // Since the addpath is called in a particular order, the states of the dancers change in that order
        //    it may cause problems if decision about how to make a path depends the state before or after

        // Will report which dancers are ends to see how things change
        debugWhoNotFinished.innerHTML = "All should be finished. These are not " + WhoIsNotFinished();

        // sets all dancers finished property to true
        for (j = 0; j <= topdancer; j++) dancer[j].f = true;
        debugWhoNotFinished.innerHTML = debugWhoNotFinished.innerHTML + "<br>After make all finished this will be empty" + WhoIsNotFinished();
        // tries 2x to find the end dancers and call addpath and if succeed marked finished false
        for (j = 0; j <= topdancer; j++) if (dancer[j].e) {
            dancer[j].i = j * 50;
            dancer[j].pn = j * 50;
            dancer[j].j = 1;
            addpath(j);
            if (dancer[j].pn > (j * 50)) dancer[j].f = false;
        }
        debugWhoNotFinished.innerHTML = debugWhoNotFinished.innerHTML + "<br>The ends should not be  finished " + WhoIsNotFinished();
        for (j = 0; j <= topdancer; j++) if (dancer[j].e) {
            dancer[j].i = j * 50;
            dancer[j].pn = j * 50;
            dancer[j].j = 1;
            addpath(j);
            if (dancer[j].pn > (j * 50)) dancer[j].f = false;
        }
        debugWhoNotFinished.innerHTML = debugWhoNotFinished.innerHTML + "<br>Maybe some other ends  " + WhoIsNotFinished();
        // tries 2x to find finished dancers and addpath
        for (j = 0; j <= topdancer; j++) if (dancer[j].f) {
            dancer[j].i = j * 50;
            dancer[j].pn = j * 50;
            dancer[j].j = 1;
            addpath(j);
            if (dancer[j].pn > (j * 50)) dancer[j].f = false;
        }
        debugWhoNotFinished.innerHTML = debugWhoNotFinished.innerHTML + "<br>Should have all Not Finished " + WhoIsNotFinished();
        for (j = 0; j <= topdancer; j++) if (dancer[j].f) {
            dancer[j].i = j * 50;
            dancer[j].pn = j * 50;
            dancer[j].j = 1;
            addpath(j);
            if (dancer[j].pn > (j * 50)) dancer[j].f = false;
        }
        debugWhoNotFinished.innerHTML = debugWhoNotFinished.innerHTML + "<br>Still All here " + WhoIsNotFinished();

        //bill
        null;
        // in good shape? //bill seems to count the number of dancers out at ends and if not 2 or 4 do some
        //       debugging 
        i = 0; // initial counter 
        for (j = 0; j <= topdancer; j++) {
            if (dancer[j].e) {
                i++;
                ae3[i] = j;
            }
        }
        if ((i == 1) || (i == 3) || (i > 4)) {
            // not correct number of dancers are out (NOTE: for odd number of couples 4 is a wrong values too! not handled
            for (j = 1; j <= i; j++) {
                k = ae3[j];
                dancer[k].c = 0; // making these dancers black
                drawdancer(k, dancer[k].x, dancer[k].y, dancer[k].a, "");
            }
            if (go != 0) go = 1; // set pause
        }

        if (endopts == 1) endopts = 0;

        if (go == 1) {
            clearInterval(siid);
            go = 0;
            stponepath = false;
            stp = false;
        }
    }
    // original code, onestep does 1 true musical beats = 10 beat
    //    if (stp && ((beat % 10) == 0) && (go != 0)) { clearInterval(siid); go = 0; stp = false; }
    //bill this has onestep doing numbeatperstep *  beat
    // so 1 is smallest step, 10 is 1 musical beat, 160 is one phrase
    if (stp && ((beat % numbeatperstep) == 0) && (go != 0)) {
        clearInterval(siid);
        go = 0;
        stp = false;
    }
} // end of drawall

function setupdancers() {
    // bill if first after reset starts with improperfaceacross won't initialize .t
    var i, j;
    topdancer = TopDancerId;
    topx = (topdancer + 1) * 50;
    for (i = 0; i <= topdancer; i++) {
        dancer[i].e = false;
        if ((i & 1) == 0) dancer[i].op = i + 1; else dancer[i].op = i - 1; // original partner
        if (((i & 3) == 1) || ((i & 3) == 2)) {
            dancer[i].s = woman;
        } else {
            dancer[i].s = man;
        }
        dancer[i].c3 = dc3[i >> 1];
        if ((formation == improper) || (formation == improperfaceacross) || (formation == properfaceacross) || (formation == reverseimproper) || (formation == improperwaves)) {
            dancer[i].x = -100 - (i >>> 1) * 100;
            dancer[i].y = 50 - (i & 1) * 100;
            if (formation == reverseimproper) dancer[i].y *= -1;
            if ((formation == improperfaceacross) || (formation == properfaceacross)) dancer[i].a = 180 - (i & 1) * 180; else dancer[i].a = ((i & 2) >>> 1) * 180 - 90;
            if (formation == improperwaves) {
                j = 1 - (i & 2);
                dancer[i].x -= j * 34;
                if (dancer[i].s == man) dancer[i].y += j * 62.5; else dancer[i].y += j * 12.5;
            }
        }
        else if ((formation == becket) || (formation == becketdiagonal)) {
            if ((i & 2) == 2) {
                dancer[i].y = -50;
                dancer[i].a = 0;
            } else {
                dancer[i].y = 50;
                dancer[i].a = 180;
            }
            dancer[i].x = -200 - (i >>> 2) * 200 + (i & 1) * 100;

            if ((formation == becketdiagonal) && (((topdancer + 1) % 4) != 0) && (i >= topdancer - 1)) {
                dancer[i].y = -50;
                dancer[i].a = 0;
                dancer[i].x = -topx - (i & 1) * 100;
            }
            if (formation == becketdiagonal) {
                if ((dancer[i].y < 0) && (dancer[i].s == woman) && (i != 2)) {
                    dancer[i].x += 50;
                    dancer[i].a += 45;
                }
                if ((dancer[i].y < 0) && (dancer[i].s == man) && (i != 3)) {
                    dancer[i].x += 0;
                    dancer[i].y -= 50;
                    dancer[i].a += 45;
                }
                if ((dancer[i].y > 0) && (dancer[i].s == woman) && ((i != (topdancer - 2)) || (((topdancer + 1) % 4) != 0))) {
                    dancer[i].x -= 50;
                    dancer[i].a += 45;
                }
                if ((dancer[i].y > 0) && (dancer[i].s == man) && ((i != (topdancer - 3)) || (((topdancer + 1) % 4) != 0))) {
                    dancer[i].x -= 0;
                    dancer[i].y += 50;
                    dancer[i].a += 45;
                }
            }
        }
        else if (formation == becketccw) {
            if ((i & 2) == 0) {
                dancer[i].y = -50;
                dancer[i].a = 0;
            } else {
                dancer[i].y = 50;
                dancer[i].a = 180;
            }
            dancer[i].x = -200 - (i >>> 2) * 200 + (1 - (i & 1)) * 100;
        }
        if ((((topdancer + 1) % 4) != 0) && (i >= topdancer - 1)) { // couple out at the end
            if (formation == becketdiagonal);
            else {
                dancer[i].e = true;
                dancer[i].x = -topx;
                dancer[i].a = 90;
                if (dancer[i].s == woman) dancer[i].y = 50; else dancer[i].y = -50;
                if (formation == reverseimproper) dancer[i].y *= -1;
                if (formation == improperfaceacross || formation == properfaceacross) {
                    dancer[i].e = false;
                    if (dancer[i].s == woman) dancer[i].a = 180; else dancer[i].a = 0;
                }
            }
        }
        dancer[i].a0 = dancer[i].a;
        dancer[i].x0 = dancer[i].x;
        dancer[i].y0 = dancer[i].y;
        dancer[i].ac = dancer[i].a;
        dancer[i].ar = "";
        dancer[i].arn = "";
        dancer[i].xc = dancer[i].x;
        dancer[i].yc = dancer[i].y;
        dancer[i].i = i * 50;
        dancer[i].j = 1;
        dancer[i].pn = i * 50;
        dancer[i].f = false;

        if ((formation == improper) || (formation == improperfaceacross)) {
            if (dancer[i].y0 > 0) {
                if (dancer[i].s == man) dancer[i].t = 1; else dancer[i].t = 2;
            }
            else {
                if (dancer[i].s == man) dancer[i].t = 2; else dancer[i].t = 1;
            }
        }
        if (formation == properfaceacross) {
            if (dancer[i].y0 > 0) {
                if (dancer[i].s == man) {
                    dancer[i].t = 1;
                    dancer[i].s = woman; // swap sexs of 1
                } else {
                    dancer[i].t = 2;
                }
            } else {
                if (dancer[i].s == man) {
                    dancer[i].t = 2;
                } else {
                    dancer[i].t = 1;
                    dancer[i].s = man; // swap sexs of 1
                }
            }
        }
        if (formation == becket) {
            if (dancer[i].y0 > 0) dancer[i].t = 1; else dancer[i].t = 2;
        }
        if (formation == becketccw) {
            if (dancer[i].y0 > 0) dancer[i].t = 2; else dancer[i].t = 1;
        }
        //bill assign sex colors as sex may have been changed to allow for proper formations
        if (dancer[i].s == man) dancer[i].c = dcm; else dancer[i].c = dcw;

    }
    //bill now done in drawdancer(...
    //dancer[0].c = dcm0;
    //dancer[1].c = dcw0;

    endopts = "";
    for (i = 2; p[i].indexOf("reset") < 0; i++);
    i--;
    if (p[i].indexOf("endopts") >= 0) eval(p[i].substr(0, p[i].indexOf(";") + 1));
    for (j = 0; j <= topdancer; j++) {
        dancer[j].i = j * 50;
        dancer[j].pn = j * 50;
        dancer[j].j = 1;
        step(j, all, 0, Math.round(still / 10), 0, 0, 0, "");
    }
    cynnext = 2;
}

function loadmsgtext(n) {
    if (msgn > 0) msgn--; else document.getElementById("msgtext").value = "";
}

function cleantext(a) {
    var t, s, i;
    if (a == "") return a;
    t = a + "\n";
    i = 0;
    while (i < t.length - 1) {
        s = t.substr(i, 2);
        if ((s == "\n ") || (s == "  ")) t = t.substr(0, i + 1) + t.substr(i + 2);
        else if ((s == "\n\n") || (s == " \n")) t = t.substr(0, i) + t.substr(i + 1);
        else i++;
    }
    return t;
}

function deleteex() {
    var a, t;
    t = document.getElementById("dancetext").value;
    t = t.substr(0, t.indexOf("\n")) + " - ";
    t = t.substr(0, t.indexOf(" - "));
    a = getcookie(t);
    if (a != "") {
        document.cookie = t + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;";
        moddancedropdown();
        msgn = 4;
        document.getElementById("msgtext").value = "Deleted: " + t;
    }
}
function saveex() {
    var a, t, u;
    u = document.getElementById("dancetext").value;
    t = u.substr(0, u.indexOf("\n")) + " - ";
    t = t.substr(0, t.indexOf(" - "));
    setcookie(t, u, 365);
    a = getcookie(t);
    msgn = 4;
    if (a == u) {
        moddancedropdown();
        document.getElementById("msgtext").value = "Saved: " + t;
    }
    else document.getElementById("msgtext").value = "NOT Saved: Cookie Problem";
}
function loadex(i, g) {
    var t;
    t = a[i].substr(0, a[i].indexOf(" - "));
    t = t.substr(1);
    if (t == "Empty") return;
    t = getcookie(t);
    t = cleantext(t);
    setcookie("currenttext", t, 365);
    document.getElementById("dancetext").value = t;
    if (g) rundance(t);
}
function loadin(i, g) {
    var t;
    t = a[i];
    t = cleantext(t);
    setcookie("currenttext", t, 365);
    document.getElementById("dancetext").value = t;
    if (g) rundance(t);
}

//bill modified to show in new text area
function showdanceroutines(TextAreaId, TitleStr) {
    var k, t;
    t = TitleStr + "\n";
    for (k = 0; p[k].indexOf("reset") < 0; k++) t += p[k] + "\n";
    document.getElementById(TextAreaId).value = t;
}

function curfig(a) {
    var d;
    d = p[cyn];
    if (d.substr(0, 1) == "+") d = d.substr(1);
    if (a == "-") return true;
    return (d.indexOf(a + "(") == 0) || (d.indexOf(" " + a + "(") >= 0);
}
function curfigopt(a, b) {
    var i, c;
    if (!curfig(a)) return false;
    if (b == "-") return true;
    i = p[cyn].indexOf(",\"") + 2;
    c = p[cyn].substr(i);
    return c.indexOf(b) >= 0;
}
function nextfig(a) {
    if (a == "-") return true;
    return (p[cynnext].indexOf(a + "(") == 0) || (p[cynnext].indexOf(" " + a + "(") >= 0);
}
function addopt(a) {
    var i, c;
    i = p[cyn].indexOf(",\"") + 2;
    c = p[cyn].substr(i);
    p[cyn] = p[cyn].substr(0, i) + a + c;
}
function replaceopt(a, b) {
    var i, j, c;
    i = p[cyn].indexOf(",\"") + 2;
    c = p[cyn].substr(i);
    j = c.indexOf(a);
    if (j == 0) c = c.substr(1); else if (j > 0) c = c.substr(0, j) + c.substr(j + 1);
    p[cyn] = p[cyn].substr(0, i) + b + c;
}
function assumedoptions() {
    var i, k, s;
    s = new Array;

    for (k = 2; p[k].indexOf("reset") < 0; k++) {
        cyn = k;
        setcynnext();

        for (i = 1; ao[i] != undefined; i++) {
            s = ao[i].split(",");
            if (nextfig(s[3]) && curfigopt(s[0], s[1])) {
                if (s[1] == "-") addopt(s[5]); else replaceopt(s[1], s[5]);
                break;
            }
        }

        if (curfig("swing") && (!curfigopt("swing", "h"))) addopt("h");
    }
}

// bill t0 is string describing dance, it is clean and parsed into lines
// each going into string array p[]. Substitutions of abreviations are made
function rundance(t0) {
    var i, j, k, m, t, d, e, n, scs;
    BillQuestion = confirm("Use Bills idea of not clearing p in findsetx?");
    //alert("Bill modified line 1445")
    if (dlist.length >= 2) dlist.splice(1, dlist.length - 1);

    if (t0 == "") return;

    if (go == 2) clearInterval(siid);
    go = 0;

    t = cleantext(t0);

    // text to array
    k = 0;
    setcookie("currentdance", t, 365);
    while (true) {
        j = t.indexOf("\n");
        if (j == 0);
        else if (j > 0) {
            p[k] = t.substr(0, j);
            while (p[k].substr(p[k].length - 1, 1) == " ") p[k] = p[k].substr(0, p[k].length - 1);
            k++;
        }
        else {
            p[k] = "reset";
            break;
        }
        t = t.substr(j + 1);
    }


    // title, formation, mods, convert to routines
    n = 0;
    title = p[n];
    eval("formation=" + p[n + 1] + ";");
    //bill go thru each line of the dance description
    //replace all shortcuts by long version
    //change long version into rountine calls
    //bill first do shortcut replacements and insertions
    for (k = 2; p[k].indexOf("reset") < 0; k++) {
        // shortcuts
        //bill if no + or = appear in
        if ((p[k].indexOf("+") < 0) && (p[k].indexOf("=") < 0)) {
            for (j = 0; sc[j] != undefined; j++) {
                if (p[k] == sc[j].substr(0, sc[j].indexOf(":"))) {
                    scs = sc[j].split(":");
                    p[k] = scs[1];
                    n = k;
                    //bill the short cut may generate more than one path, so then
                    //get inserted and everything shifted over
                    //note n is NOT used here. Also the code is relying on the added
                    //commands when being converted to routine call will NOT match
                    //anyshort cut as the nexttime thru the loop over k
                    for (i = 2; scs[i] != undefined; i++) {
                        d = scs[i];
                        n++;
                        for (m = k + i - 1; true; m++) {
                            e = p[m];
                            p[m] = d;
                            d = e;
                            if (e == "reset") {
                                p[m + 1] = e;
                                break;
                            }
                        }
                    }
                    break;
                }
            }
            e = " ";
        }

    }

    showdanceroutines("dancetext2", "After Short Cuts");
    //bill so now commands in long form 
    // Now convert to calls of routines
    for (k = 2; p[k].indexOf("reset") < 0; k++) {
        // add +all,* if no params
        if ((p[k].indexOf("+") < 0) && (p[k].indexOf("=") < 0)) p[k] += " +all,*";
        // add ,* if not there
        if (p[k].indexOf("*") < 0) p[k] += ",*";

        // convert to routines
        j = p[k].indexOf("~");
        if (j >= 0) p[k] = "endopts@\"" + p[k].substr(j + 1) + "\"; " + p[k].substr(0, j);
        p[k] = p[k].replace("+", "(i,");
        if (p[k].indexOf("=") >= 0) p[k] = "+" + p[k].replace("=", "(i,");
        p[k] = p[k].replace("*", "\"") + " \");";
        p[k] = p[k].replace("@", "=");


        // cleanup
        for (j = 1; j <= 50; j++) p[k] = p[k].replace(" ", "");
        p[k] = p[k].replace(";", "; ");
    }
    showdanceroutines("dancetext1", "After Convert");
    assumedoptions();
    showdanceroutines("dancetext0", "After assumedoptions");

    tn = -1;
    tr = 0;
    ts = 0;
    tx = new Array(cycle);
    ty = new Array(cycle);
    gd = gd0;
    lb = 0;
    beat = 0;

    endoptsdone = 2;
    if (prescan) { // prescan sets up endopts before the first cycle
        setupdancers();
        beat = 640 - still;
        prescanx = true;
        while (beat <= 640 * 6) drawall();
        prescanx = false;
    }

    setupdancers();
    beat = 640 - still;
    trail(2); //bill
    pause(1);

}