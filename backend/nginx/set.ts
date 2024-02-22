import fs from 'node:fs/promises';
import mustache from 'mustache';
import { exec } from 'child_process'
// import { promises } from 'node:fs/promises';
import path from 'node:path';
// Sample data representing your projects
export const projects: object[] = [

    ];

    
export async function generateNginxConfig() {
      try {
        // 1. Resolve the relative path
        const templatePath = path.resolve(__dirname, './nginx_template.mustache');
    
        // 2. Read the Mustache template
        const template = await fs.readFile(templatePath, 'utf8');
    
        // 3. Render the template
        const nginxConfig = mustache.render(template, { projects });
    
        // 4. Write the generated configuration
        await fs.writeFile(`/etc/nginx/nginx.conf`, nginxConfig);
    
        // 5. Reload Nginx 
        exec('sudo systemctl reload nginx', (error, stdout, stderr) => {
          if (error) {
            console.error(`Nginx reload failed: ${error.message}`);
            throw error; 
          } else {
            console.log('Nginx reloaded successfully');
          }
        });
      } catch (error) {
        console.error("Error generating Nginx configuration:", error);
        // Handle the error appropriately 
      }
    }
 












































































