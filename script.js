// Just Girl Calc - JavaScript Logic

class JustGirlCalc {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '';
        this.shouldResetDisplay = false;
        
        // Message arrays for different scenarios
        this.multiplicationMessages = [
            "عمر الضرب ما كان حل 🥺",
            "بتضربهم في بعض ليه بس، حرام عليك 💔",
            "صوابعي هتبوظ من المانيكير، اضربهم انت بمعرفتك.",
            "متتخانقوش يا أرقام، اهدوا يا جماعة.",
            "i am just a girl مقدرش على العنف ده 💅"
        ];

        this.additionMessages = [
            "كتر الأرقام بيلخبطني، أنا آخري أجمع صحابي 😩",
            "يارب كتر اللايكات مش الأرقام 🙏",
            "يعني هنفضل نجمع في أرقام لحد امتى؟ ما تيجي نجمع فلوس 💸",
            "اجمعهم بسرعة قبل ما الميكب بتاعي يسيح.",
            "كل ده زائد؟ هو أنا وزني اللي زاد لوحده؟"
        ];

        this.subtractionMessages = [
            "مش هنخسر بعض عشان شوية أرقام تافهة 😢",
            "ناقصين هم إحنا؟ ما ترحمونا بقى.",
            "الطرح ده بيجيبلي اكتئاب وبيفكرني بالماضي 🥀",
            "Don't be so negative بليز.",
            "أنا أطرح طرحة جديدة أحسن من وجع الدماغ ده."
        ];

        this.divisionMessages = [
            "ليه تفرق بينهم؟ مسيرهم يتصالحوا في الآخر.",
            "القسمة دي بتفكرني بالأكس بتاعي 💔",
            "ربنا ما يجيب قسمة وحشة أبدًا.",
            "هو أنا ورثت عشان تقسم؟",
            "كل واحد ياخد بتاعه ومنشوفش وش بعض تاني."
        ];

        this.divideByZeroMessages = [
            "إيه اللي انت عملته ده؟ بوظتني!",
            "مينفعش طبعًا، ده حتى في العلاقات مينفعش.",
            "الكون كله هينفجر لو عملنا كده، اهدا والنبي."
        ];

        this.complexMessages = [
            "لا لا لا كل ده! انت عايز تجنني؟",
            "دماغي لفت، هاتلي قهوة الأول عشان أركز ☕",
            "دي مسألة دي ولا شتيمة؟",
            "معلش أصلي أدبي، مليش في الكلام ده.",
            "أنا مخي مش بروسيسور يا حبيبي، براحة عليا."
        ];

        this.jealousyPhoneMessages = [
            "ده رقم اسماء ده؟ روح كلمها أحسن. 😒",
            "رقم مين ده اللي بتكتبهولي؟ عايزني أغير يعني؟",
            "لو ده رقم واحدة تانية، قولي من دلوقتي عشان منزعلش من بعض. 😠",
            "شايفاك وانت بتفتح الـ Instagram... عجباك صورهم أوي؟"
        ];

        this.jealousyDateMessages = [
            "عيد الحب؟ بتحسبه مع مين يا حبيبي؟ 🔪",
            "تاريخ ميلادها، مش كده؟ أنا فاكرة كل حاجة.",
            "ياريتك كنت فاكر تاريخ أول مرة فتحتني فيها زي ما انت حافظ التواريخ دي."
        ];

        this.clearMessages = [
            "بتمسح إيه؟ هو أنا كتبت حاجة غلط؟ 🥺",
            "امسح الماضي كله، أنا موافقة.",
            "مسحت الرقم؟ طب امسح نمرته من عندك بالمرة."
        ];

        this.generalMessages = [
            "بلاش عبط، أنا آلة حاسبة مش ساحرة.",
            "النتيجة طلعت... بس مش هقولك 😜",
            "k.",
            "خلاص، مش لاعبة.",
            "احسبها انت بقى طالما شاطر أوي كده."
        ];

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Number buttons (Arabic numerals)
        const numberMap = {
            'zero': '0', 'one': '1', 'two': '2', 'three': '3', 
            'four': '4', 'five': '5', 'six': '6', 'seven': '7', 
            'eight': '8', 'nine': '9'
        };

        Object.keys(numberMap).forEach(id => {
            document.getElementById(id).addEventListener('click', () => {
                this.appendToDisplay(numberMap[id]);
            });
        });

        // Operator buttons
        document.getElementById('add').addEventListener('click', () => this.appendToDisplay('+'));
        document.getElementById('subtract').addEventListener('click', () => this.appendToDisplay('-'));
        document.getElementById('multiply').addEventListener('click', () => this.appendToDisplay('*'));
        document.getElementById('divide').addEventListener('click', () => this.appendToDisplay('/'));
        document.getElementById('decimal').addEventListener('click', () => this.appendToDisplay('.'));

        // Special buttons
        document.getElementById('clear').addEventListener('click', () => this.clearDisplay());
        document.getElementById('equals').addEventListener('click', () => this.calculateResult());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    appendToDisplay(value) {
        if (this.shouldResetDisplay) {
            this.currentInput = '';
            this.shouldResetDisplay = false;
            this.display.className = 'display'; // Reset any special classes
        }

        this.currentInput += value;
        this.updateDisplay(this.currentInput);
    }

    updateDisplay(text) {
        this.display.textContent = text || '...اكتبي أرقامك يا حلوة';
    }

    clearDisplay() {
        const message = this.getRandomMessage(this.clearMessages);
        
        // Show clear message temporarily
        this.display.textContent = message;
        this.display.className = 'display clear-message';
        
        setTimeout(() => {
            this.currentInput = '';
            this.updateDisplay();
            this.display.className = 'display';
            this.shouldResetDisplay = false;
        }, 1500);
    }

    calculateResult() {
        if (!this.currentInput.trim()) {
            this.showSassyMessage(this.getRandomMessage(this.generalMessages));
            return;
        }

        // Convert Arabic numerals to English for processing
        const input = this.convertArabicToEnglish(this.currentInput);
        
        // Check for jealousy triggers first (high priority)
        if (this.isPhoneNumber(input)) {
            this.showJealousMessage(this.getRandomMessage(this.jealousyPhoneMessages));
            return;
        }

        if (this.isSpecialDate(input)) {
            this.showJealousMessage(this.getRandomMessage(this.jealousyDateMessages));
            return;
        }

        // Check for division by zero
        if (this.isDivisionByZero(input)) {
            this.showSassyMessage(this.getRandomMessage(this.divideByZeroMessages));
            return;
        }

        // Check operation types
        const operators = this.getOperators(input);
        
        if (operators.length > 1 || this.hasComplexOperation(input)) {
            this.showSassyMessage(this.getRandomMessage(this.complexMessages));
        } else if (operators.includes('*')) {
            this.showSassyMessage(this.getRandomMessage(this.multiplicationMessages));
        } else if (operators.includes('/')) {
            this.showSassyMessage(this.getRandomMessage(this.divisionMessages));
        } else if (operators.includes('+')) {
            this.showSassyMessage(this.getRandomMessage(this.additionMessages));
        } else if (operators.includes('-')) {
            this.showSassyMessage(this.getRandomMessage(this.subtractionMessages));
        } else {
            this.showSassyMessage(this.getRandomMessage(this.generalMessages));
        }
    }

    showSassyMessage(message) {
        this.display.textContent = message;
        this.display.className = 'display sassy';
        this.shouldResetDisplay = true;
    }

    showJealousMessage(message) {
        this.display.textContent = message;
        this.display.className = 'display jealous';
        this.shouldResetDisplay = true;
    }

    convertArabicToEnglish(text) {
        const arabicNumerals = '٠١٢٣٤٥٦٧٨٩';
        const englishNumerals = '0123456789';
        
        return text.split('').map(char => {
            const index = arabicNumerals.indexOf(char);
            return index !== -1 ? englishNumerals[index] : char;
        }).join('');
    }

    isPhoneNumber(input) {
        // Remove operators and check if it's a long number (phone number)
        const numbersOnly = input.replace(/[+\-*/.\s]/g, '');
        return numbersOnly.length > 7 && /^\d+$/.test(numbersOnly);
    }

    isSpecialDate(input) {
        // Check for specific date patterns like 1402 (Feb 14) or 2512 (Dec 25)
        const numbersOnly = input.replace(/[+\-*/.\s]/g, '');
        const specialDates = ['1402', '2512', '0214', '1225', '1414', '2525'];
        return specialDates.includes(numbersOnly);
    }

    isDivisionByZero(input) {
        return /\/0(?![0-9])/.test(input);
    }

    getOperators(input) {
        const operators = [];
        if (input.includes('+')) operators.push('+');
        if (input.includes('-')) operators.push('-');
        if (input.includes('*')) operators.push('*');
        if (input.includes('/')) operators.push('/');
        return [...new Set(operators)]; // Remove duplicates
    }

    hasComplexOperation(input) {
        const operatorCount = (input.match(/[+\-*/]/g) || []).length;
        return operatorCount > 1;
    }

    getRandomMessage(messages) {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    handleKeyboard(e) {
        e.preventDefault();
        
        // Number keys
        if (e.key >= '0' && e.key <= '9') {
            this.appendToDisplay(e.key);
        }
        
        // Operator keys
        switch (e.key) {
            case '+':
                this.appendToDisplay('+');
                break;
            case '-':
                this.appendToDisplay('-');
                break;
            case '*':
                this.appendToDisplay('*');
                break;
            case '/':
                this.appendToDisplay('/');
                break;
            case '.':
                this.appendToDisplay('.');
                break;
            case 'Enter':
            case '=':
                this.calculateResult();
                break;
            case 'Escape':
            case 'c':
            case 'C':
                this.clearDisplay();
                break;
            case 'Backspace':
                if (this.currentInput.length > 0) {
                    this.currentInput = this.currentInput.slice(0, -1);
                    this.updateDisplay(this.currentInput);
                }
                break;
        }
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new JustGirlCalc();
});

// Add some extra personality with random compliments
const randomCompliments = [
    "حبيبتي انت جميلة اوي النهاردة! 💕",
    "الميكب بتاعك perfect! ✨",
    "انت أحلى من الحاسبة دي بمراحل 🌸"
];

// Show random compliment occasionally
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const display = document.getElementById('display');
        if (display.textContent === '...اكتبي أرقامك يا حلوة') {
            const compliment = randomCompliments[Math.floor(Math.random() * randomCompliments.length)];
            display.textContent = compliment;
            display.className = 'display sassy';
            
            setTimeout(() => {
                display.textContent = '...اكتبي أرقامك يا حلوة';
                display.className = 'display';
            }, 3000);
        }
    }
}, 30000);