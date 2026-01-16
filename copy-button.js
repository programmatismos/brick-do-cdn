// FINAL VERSION - Βρίσκει τον κώδικα ΟΠΟΥ ΚΙ ΑΝ ΕΙΝΑΙ
(function() {
    console.log('🚀 Εκκίνηση αντιγραφής...');
    
    function findCodeElement() {
        console.log('🔍 Ψάχνω για κώδικα...');
        
        // 1. Πρώτα, ψάξε για TEXTAREA (αν υπάρχει)
        const textareas = document.querySelectorAll('textarea');
        for (const ta of textareas) {
            if (ta.value && ta.value.includes('<!DOCTYPE')) {
                console.log('✅ Βρέθηκε textarea με HTML');
                return ta;
            }
        }
        
        // 2. Αν όχι, ψάξε για PRE
        const preElements = document.querySelectorAll('pre');
        for (const pre of preElements) {
            const text = pre.textContent || '';
            if (text.includes('<!DOCTYPE') || text.includes('<html')) {
                console.log('✅ Βρέθηκε PRE με HTML');
                return pre;
            }
        }
        
        // 3. Αν όχι, ψάξε για CODE
        const codeElements = document.querySelectorAll('code');
        for (const code of codeElements) {
            const text = code.textContent || '';
            if (text.includes('<!DOCTYPE') || text.includes('<html')) {
                console.log('✅ Βρέθηκε CODE με HTML');
                return code;
            }
        }
        
        // 4. Αν όχι, ψάξε σε ΟΛΑ τα στοιχεία
        const allElements = document.querySelectorAll('body *');
        for (const el of allElements) {
            const text = el.textContent || el.innerText || '';
            if (text.length > 1000 && (text.includes('<!DOCTYPE') || text.includes('Calorie Calculator'))) {
                console.log('✅ Βρέθηκε κώδικας σε:', el.tagName, el.className);
                return el;
            }
        }
        
        console.error('❌ Δεν βρέθηκε κανένας κώδικας!');
        return null;
    }
    
    function createCopyButton(codeElement) {
        console.log('🔨 Δημιουργία κουμπιού...');
        
        // Δημιούργησε container
        const buttonDiv = document.createElement('div');
        buttonDiv.style.cssText = 'margin-bottom: 15px; text-align: right;';
        
        // Δημιούργησε κουμπί
        const copyBtn = document.createElement('button');
        copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
        copyBtn.style.cssText = \`
            padding: 10px 20px;
            background: #2c3e50;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            transition: background 0.3s;
        \`;
        
        // Προσθήκη hover
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = '#1a252f';
        });
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = '#2c3e50';
        });
        
        // Προσθήκη click
        copyBtn.addEventListener('click', function() {
            console.log('🖱️ Κλικ για αντιγραφή');
            
            // Πάρε το κείμενο
            const textToCopy = codeElement.value || codeElement.textContent || codeElement.innerText;
            
            if (!textToCopy) {
                console.error('Κενό κείμενο!');
                return;
            }
            
            console.log('📝 Αντιγραφή', textToCopy.length, 'χαρακτήρες');
            
            // Αντιγραφή
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        copyBtn.textContent = '✅ Αντιγράφηκε!';
                        copyBtn.style.background = '#27ae60';
                        setTimeout(() => {
                            copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
                            copyBtn.style.background = '#2c3e50';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Clipboard error:', err);
                        fallbackCopy(textToCopy, copyBtn);
                    });
            } else {
                fallbackCopy(textToCopy, copyBtn);
            }
        });
        
        function fallbackCopy(text, button) {
            const temp = document.createElement('textarea');
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            
            button.textContent = '✅ Αντιγράφηκε!';
            button.style.background = '#27ae60';
            setTimeout(() => {
                button.textContent = '📋 Αντιγραφή Κώδικα';
                button.style.background = '#2c3e50';
            }, 2000);
        }
        
        // Σύνδεση
        buttonDiv.appendChild(copyBtn);
        
        // Βάλε το κουμπί ΠΡΙΝ από τον κώδικα
        if (codeElement.parentNode) {
            codeElement.parentNode.insertBefore(buttonDiv, codeElement);
            console.log('✅ Κουμπί προστέθηκε ΠΡΙΝ από τον κώδικα!');
        } else {
            document.body.insertBefore(buttonDiv, document.body.firstChild);
            console.log('⚠️ Κουμπί προστέθηκε στην αρχή της σελίδας');
        }
        
        return copyBtn;
    }
    
    function init() {
        console.log('🎬 Αρχικοποίηση...');
        
        const codeElement = findCodeElement();
        
        if (!codeElement) {
            console.error('❌ Δεν μπορώ να βρω κώδικα για αντιγραφή!');
            return;
        }
        
        createCopyButton(codeElement);
    }
    
    // Εκτέλεση
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Επαναπροσπάθεια μετά από 2 δευτερόλεπτα
    setTimeout(init, 2000);
})();
