const heading=document.createElement("h1");
heading.textContent="Chill Calculator";

const div=document.createElement("div");
const input=document.createElement("input");
const container=document.createElement("div");

div.classList.add("calc");
input.classList.add("input");
container.classList.add("container");

document.body.appendChild(div);
div.appendChild(heading);
div.appendChild(input);
div.appendChild(container);

function createButton(text){
    const btn=document.createElement("button");
    btn.textContent=text;
    return btn;
}

input.readOnly=true;
const buttons=['+','-','*','/',
               '=','0','1',
               '2','3','4','5',
               '6','7','8','9','.','C',
               'AC'
];


buttons.forEach(text=>{
    const btn=createButton(text);
    container.appendChild(btn);
    btn.addEventListener("click",()=>handleButtonClick(text));
});



function handleButtonClick(text){
    if(text==='AC'){
        input.value="";
    }
    else if(text==='C'){
        input.value=input.value.slice(0,-1);
    }
    else if(text==='='){
        input.value=calculate(input.value);
    }
    else{
        if(text==='.' && input.value.includes('.'))return;
        input.value+=text;
    }
}

function calculate(text){
    try{
        const tokens=text.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
        if(!tokens)return 'Error';

        let nums=[];
        let ops=[];

        const precedence={'+':1,'-':1,'*':2,'/':2};

        const applyOp=()=>{
            const b=nums.pop();
            const a=nums.pop();
            const op=ops.pop();
            if(op==='+')nums.push(a+b);
            else if(op==='-')nums.push(a-b);
            else if(op==='*')nums.push(a*b);
            else if(op==='/')nums.push(b===0?NaN:a/b);
        };

        for(let i=0;i<tokens.length;i++){
            const token=tokens[i];
            if(!isNaN(token)){
                nums.push(parseFloat(token));
            }
            else{
                while(ops.length && precedence[ops[ops.length-1]]>=precedence[token]){
                    applyOp();
                }
                ops.push(token);
            }

        }
        while(ops.length)applyOp();
        return isNaN(nums[0])?'Error':nums[0];
    }catch(e){
        return 'Error';
    }
}


