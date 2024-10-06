window.onload = function() {
    document.getElementById('rollButton').addEventListener('click', rollDice);
    document.getElementById('testCorsButton').addEventListener('click', testCorsFailure);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('rollButton').click();
        }
    });
};

async function rollDice() {
    const die1Element = document.getElementById('die1');
    const die2Element = document.getElementById('die2');

    try {
        const response = await fetch ('https://web-dice-roll-nodejs-jy-bcbcfjfacnc3aedj.centralus-01.azurewebsites.net/roll-dice');
        const data = await response.json();

        setDiceFace(die1Element, data.die1);
        setDiceFace(die2Element, data.die2);

        document.getElementById('result1').value = data.die1;
        document.getElementById('result2').value = data.die2;
    }
    catch (error) {
        console.error('Failure to roll the dice', error);
    }
}

function setDiceFace(dieElement, number) {
    const faces = [
        {x: 0, y: 0},
        {x: 90, y: 0},
        {x: 0, y: -90},
        {x: 0, y: 90},
        {x: -90, y: 0},
        {x: 180, y: 0}
    ];

    let selectedFace = faces[number - 1];
    dieElement.style.transform = `rotateX(${selectedFace.x}deg) rotateY(${selectedFace.y}deg)`;
}

async function testCorsFailure() {
    try {
        const response = await fetch('https://web-dice-roll-nodejs-jy-bcbcfjfacnc3aedj.centralus-01.azurewebsites.net/roll-dice-fail');
        const data = await response.json();
        console.log('CORS Failure Test Response:', data);
    }
    catch (error) {
        console.error('CORS Failure as expected', error);
    }
}