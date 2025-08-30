// Just Girl Calc - Enhanced JavaScript with SEO Tracking

class JustGirlCalc {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '';
        this.shouldResetDisplay = false;
        this.sessionStartTime = Date.now();
        this.interactionCount = 0;
        
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
            "طب هو احنا في امتحان رياضة؟ 😤",
            "مالك بتطرحي كده، زهقانة مني؟",
            "ناقص ايه يا قمر؟ ناقص بس شوية تقدير لمجهودي.",
            "يعني مش كفاية اللي انا شايلاه، لازم طرح كمان؟ 😮‍💨"
        ];

        this.divisionMessages = [
            "يا خبر! انت عايزاني أقسم الأرقام دي؟ حاضر يا فندم.",
            "قسمة! أفكرها رياضة تخسيس للأرقام؟ 🤔",
            "بتقسمي إيه على إيه دلوقتي؟ عقلي انقسم من الحساب.",
            "قسمة قسمة... ده كأنك بتقوليلي اتجوزي واتطلقي."
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
            "بالراحة! ده تاريخ ايه اللي انت كاتبه ده؟",
            "ده ذكرى أيه؟ مش فاكرة أني حضرت الحدث ده.",
            "الله الله... ده تاريخ مهم ولا ايه؟ وأنا مع مين انا النهار ده؟",
            "قولي بالراحة... ده تاريخ حبايبك القدام؟ 😤"
        ];

        this.clearMessages = [
            "هاي هاي! زهقتم مني؟ 😢",
            "ليه بتمسحوني كده، أنا مجرحتكوش.",
            "مسح! أصلي أوفر كده عليكم، مضايقكوش؟",
            "امسحي امسحي، العتب عالنظر 😤",
            "آدي الحل! امسحي كل حاجة وابدئي من جديد."
        ];
        
        this.initializeSEOTracking();
        this.initializeCalculator();
    }

    // Convert Arabic numerals to English numerals for calculations
    convertArabicToEnglishNumerals(input) {
        const arabicToEnglish = {
            '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
            '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
        };
        
        // Also convert Arabic operators to standard operators
        let converted = input.replace(/[٠-٩]/g, (char) => arabicToEnglish[char] || char);
        converted = converted.replace(/×/g, '*');
        converted = converted.replace(/÷/g, '/');
        
        return converted;
    }

    initializeSEOTracking() {
        // Track page load for SEO analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                'page_title': 'حاسبة البنات الساخرة',
                'page_location': window.location.href,
                'custom_map.arabic_content': true,
                'custom_map.target_audience': 'girls'
            });
        }
        
        // Track calculator load
        this.trackSEOEvent('calculator_loaded', 'engagement', 'حاسبة البنات محملة');
        
        // Set up periodic engagement tracking
        setInterval(() => {
            if (this.interactionCount > 0) {
                this.trackSEOEvent('session_active', 'engagement', `${this.interactionCount} interactions`);
            }
        }, 30000); // Every 30 seconds
        
        // Track scroll behavior for engagement
        let scrollTracked = false;
        window.addEventListener('scroll', () => {
            if (!scrollTracked && window.scrollY > 100) {
                this.trackSEOEvent('page_scroll', 'engagement', 'user scrolled page');
                scrollTracked = true;
            }
        });
        
        // Track time on page for engagement metrics
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - this.sessionStartTime) / 1000);
            this.trackSEOEvent('session_duration', 'engagement', `${timeSpent} seconds`);
        });
    }
    
    trackSEOEvent(action, category, label) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'custom_map.arabic_site': true,
                'custom_map.girl_calculator': true
            });
        }
        
        // Console tracking for debugging
        console.log(`SEO Event: ${action} | ${category} | ${label}`);
        
        // Track for SEO metrics
        this.updateEngagementMetrics(action);
    }
    
    updateEngagementMetrics(action) {
        this.interactionCount++;
        
        // Track specific calculator interactions for SEO
        if (action.includes('button_click')) {
            this.trackSEOEvent('calculator_engagement', 'interaction', `button ${action}`);
        }
        
        // Track if user is highly engaged (many interactions)
        if (this.interactionCount === 10) {
            this.trackSEOEvent('high_engagement', 'milestone', 'user very engaged');
        }
        
        if (this.interactionCount === 25) {
            this.trackSEOEvent('super_engagement', 'milestone', 'user super engaged');
        }
    }

    initializeCalculator() {
        this.initializeEventListeners();
        
        // Track calculator initialization for SEO
        this.trackSEOEvent('calculator_initialized', 'setup', 'calculator ready for use');
    }

    initializeEventListeners() {
        // Button click events
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const value = e.target.textContent;
                
                // Track button clicks for SEO
                this.trackSEOEvent('button_click', 'interaction', `button_${value}`);
                
                if (e.target.classList.contains('btn-clear')) {
                    this.clearDisplay();
                } else if (e.target.classList.contains('btn-equals')) {
                    this.calculateResult();
                } else {
                    this.appendToDisplay(value);
                }
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    appendToDisplay(value) {
        if (this.shouldResetDisplay) {
            this.currentInput = '';
            this.shouldResetDisplay = false;
        }
        
        this.currentInput += value;
        this.updateDisplay(this.currentInput);
    }

    updateDisplay(text) {
        this.display.textContent = text || '...اكتبي أرقامك يا حلوة';
    }

    clearDisplay() {
        this.currentInput = '';
        const message = this.getRandomMessage(this.clearMessages);
        this.showSassyMessage(message);
        
        // Track clear action for SEO
        this.trackSEOEvent('calculator_clear', 'interaction', 'user cleared calculator');
        
        setTimeout(() => {
            this.updateDisplay('');
        }, 2000);
    }

    calculateResult() {
        if (!this.currentInput) return;

        // Track calculation for SEO
        this.trackSEOEvent('calculation_attempt', 'interaction', 'user attempted calculation');

        const input = this.convertArabicToEnglishNumerals(this.currentInput);

        // Check for jealousy triggers first
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
            // Simple number or no operation - just show result
            try {
                const result = eval(input);
                this.display.textContent = result;
                this.currentInput = result.toString();
                this.shouldResetDisplay = true;
                
                // Track successful calculation for SEO
                this.trackSEOEvent('calculation_success', 'interaction', 'successful calculation');
            } catch (error) {
                this.showSassyMessage("إيه ده اللي كتبتيه ده؟ مش فاهمة! 🤷‍♀️");
            }
        }
    }

    // Helper methods
    isPhoneNumber(input) {
        // Egyptian phone patterns
        const phonePatterns = [
            /^01[0125]\d{8}$/,  // Egyptian mobile
            /^(\+20|0020)?01[0125]\d{8}$/,  // With country code
            /^\d{11}$/  // Simple 11 digit check
        ];
        
        const cleanInput = input.replace(/[\+\-\*\/\(\)\s]/g, '');
        return phonePatterns.some(pattern => pattern.test(cleanInput));
    }

    isSpecialDate(input) {
        // Check for date patterns like dd/mm/yyyy or dd-mm-yyyy
        const datePatterns = [
            /^\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}$/,
            /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/
        ];
        
        return datePatterns.some(pattern => pattern.test(input));
    }

    isDivisionByZero(input) {
        return /\/\s*0(?!\d)/.test(input);
    }

    getOperators(input) {
        const operators = [];
        if (input.includes('+')) operators.push('+');
        if (input.includes('-')) operators.push('-');
        if (input.includes('*')) operators.push('*');
        if (input.includes('/')) operators.push('/');
        return operators;
    }

    hasComplexOperation(input) {
        // Check for parentheses or multiple consecutive operators
        return /[\(\)]/.test(input) || /[\+\-\*\/]{2,}/.test(input);
    }

    showSassyMessage(message) {
        this.display.textContent = message;
        this.display.className = 'display sassy';
        this.shouldResetDisplay = true;
        
        setTimeout(() => {
            this.display.className = 'display';
        }, 3000);
    }

    showJealousMessage(message) {
        this.display.textContent = message;
        this.display.className = 'display jealous';
        this.shouldResetDisplay = true;
        
        setTimeout(() => {
            this.display.className = 'display';
        }, 4000);
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
        if (display && display.textContent === '...اكتبي أرقامك يا حلوة') {
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