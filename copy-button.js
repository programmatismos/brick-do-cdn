// copy-button.js - ολόκληρος ο κώδικας
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.querySelector('textarea[name="ex_4_2_a"]');
    
    if (!textarea) {
        console.log('Δεν βρέθηκε textarea');
        return;
    }
    
    // Δημιουργία container αν δεν υπάρχει
    let container = textarea.closest('div[id="code-container"]');
    if (!container) {
        container = document.createElement('div');
        container.style.position = 'relative';
        container.style.margin = '20px 0';
        container.id = 'code-container';
        
        textarea.parentNode.insertBefore(container, textarea);
        container.appendChild(textarea);
    }
    
    // Δημιουργία κουμπιού αν δεν υπάρχει
    let copyBtn = document.getElementById('copyCodeBtn');
    if (!copyBtn) {
        copyBtn = document.createElement('button');
        copyBtn.id = 'copyCodeBtn';
        copyBtn.textContent = '📋 Αντιγραφή Κώδικα';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 8px 16px;
            background: #2c3e50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            z-index: 100;
        `;
        container.appendChild(copyBtn);
    }
    
    // Προσθήκη λειτουργίας
    copyBtn.addEventListener('click', function() {
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        // Προσπάθεια με modern API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textarea.value)
                .then(() => showSuccess(this))
                .catch(() => fallbackCopy(this, textarea));
        } else {
            fallbackCopy(this, textarea);
        }
    });
    
    function showSuccess(button) {
        button.textContent = '✅ Αντιγράφηκε!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = '📋 Αντιγραφή Κώδικα';
            button.style.background = '#2c3e50';
        }, 2000);
    }
    
    function fallbackCopy(button, textarea) {
        const originalText = button.textContent;
        const successful = document.execCommand('copy');
        
        if (successful) {
            showSuccess(button);
        } else {
            button.textContent = 'Πατήστε Ctrl+C';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
    }
    
    console.log('Copy button initialized!');
});
