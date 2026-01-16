// copy-button.js - ΕΝΗΜΕΡΩΜΕΝΗ ΕΚΔΟΣΗ
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Αναζήτηση textarea...');
    
    // Βρες το textarea
    const textarea = document.querySelector('textarea[name="ex_4_2_a"]');
    
    if (!textarea) {
        console.error('❌ Δεν βρέθηκε textarea');
        return;
    }
    
    console.log('✅ Βρέθηκε textarea:', textarea);
    
    // Βρες το container
    const targetContainer = textarea.closest('.page-preview-item.ck-content');
    
    if (!targetContainer) {
        console.error('❌ Δεν βρέθηκε container');
        return;
    }
    
    console.log('✅ Βρέθηκε container:', targetContainer);
    
    // Δημιούργησε κουμπί
    const copyBtn = document.createElement('button');
    copyBtn.id = 'finalCopyBtn';
    copyBtn.innerHTML = '📋 Αντιγραφή Κώδικα';
    copyBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        padding: 10px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        transition: all 0.3s ease;
    `;
    
    // Προσθήκη hover effect
    copyBtn.onmouseenter = function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
    };
    
    copyBtn.onmouseleave = function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    };
    
    // Διόρθωση container
    targetContainer.style.position = 'relative';
    targetContainer.style.paddingTop = '60px';
    
    // Προσθήκη κουμπιού
    targetContainer.appendChild(copyBtn);
    
    // Προσθήκη event listener
    copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🖱️ Κλικ στο κουμπί αντιγραφής');
        
        textarea.select();
        textarea.setSelectionRange(0, 99999);
        
        // Modern clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textarea.value)
                .then(() => {
                    console.log('✅ Αντιγράφηκε με success!');
                    showSuccess();
                })
                .catch(err => {
                    console.error('❌ Σφάλμα με clipboard API:', err);
                    fallbackCopy();
                });
        } else {
            fallbackCopy();
        }
        
        function showSuccess() {
            copyBtn.innerHTML = '✅ Αντιγράφηκε!';
            copyBtn.style.background = '#27ae60';
            
            setTimeout(() => {
                copyBtn.innerHTML = '📋 Αντιγραφή Κώδικα';
                copyBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 2000);
        }
        
        function fallbackCopy() {
            const successful = document.execCommand('copy');
            if (successful) {
                console.log('✅ Αντιγράφηκε με fallback method');
                showSuccess();
            } else {
                console.error('❌ Αποτυχία αντιγραφής');
                copyBtn.innerHTML = '⛔ Σφάλμα';
                copyBtn.style.background = '#e74c3c';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '📋 Αντιγραφή Κώδικα';
                    copyBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }, 2000);
            }
        }
    });
    
    console.log('🚀 Το κουμπί αντιγραφής προστέθηκε επιτυχώς!');
});
