// WEB303 Assignment 2


document.addEventListener('DOMContentLoaded', () => 
{
    
    document.getElementById('content-wrapper').addEventListener('click', function(e) {
        e.preventDefault(); 
        
        
        const targetId = e.target.id;
        if (targetId === 'prospect' || targetId === 'convert' || targetId === 'retain') {
           
            
            const targetFile = targetId + '.html';

            
    
            const xhr = new XMLHttpRequest();

          
            xhr.open('GET', targetFile, true);

            
            xhr.send();

            xhr.onload = function() 
            {
                if (xhr.status != 200) 
                {
                    console.error(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
                } 
                else 
                {
                   
                    $('#content').fadeOut(250, function() 
                    {
            
                        document.getElementById('content').innerHTML = xhr.responseText;

                        $('#content').hide().fadeIn(250);
                    });
                }
            };
        }
    });
});
