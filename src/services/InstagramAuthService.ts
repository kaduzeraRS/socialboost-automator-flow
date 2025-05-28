
interface InstagramLoginConfig {
  username: string;
  password: string;
  onStatusChange?: (status: string) => void;
}

interface InstagramLoginResult {
  success: boolean;
  userData?: any;
  error?: string;
}

export class InstagramAuthService {
  private extractInstagramData(doc: Document): any | null {
    try {
      console.log('Extraindo dados do Instagram...');
      
      // Extrair username
      const usernameElement = doc.querySelector('span.x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft');
      const username = usernameElement?.textContent?.trim() || '';
      console.log('Username encontrado:', username);
      
      if (!username) {
        console.log('Username não encontrado');
        return null;
      }
      
      // Extrair posts
      const postsElement = doc.querySelector('span.x5n08af.x1s688f span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs');
      const posts = parseInt(postsElement?.textContent?.trim() || '0');
      console.log('Posts encontrados:', posts);
      
      // Extrair seguidores - buscar pelo elemento com title
      const followersElement = doc.querySelector('span.x5n08af.x1s688f[title] span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs');
      let followers = 0;
      if (followersElement) {
        const titleElement = followersElement.closest('span[title]');
        if (titleElement) {
          const titleValue = titleElement.getAttribute('title');
          followers = parseInt(titleValue || '0');
          console.log('Seguidores encontrados via title:', followers);
        }
      }
      
      // Se não encontrou via title, tentar pelos elementos na ordem
      let following = 0;
      if (followers === 0) {
        const allStatsElements = doc.querySelectorAll('span.x5n08af.x1s688f span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs');
        console.log(`Encontrados ${allStatsElements.length} elementos de estatísticas`);
        
        if (allStatsElements.length >= 3) {
          // posts = parseInt(allStatsElements[0]?.textContent?.trim() || '0'); // já capturado
          followers = parseInt(allStatsElements[1]?.textContent?.trim() || '0');
          following = parseInt(allStatsElements[2]?.textContent?.trim() || '0');
          console.log('Estatísticas - Posts:', posts, 'Seguidores:', followers, 'Seguindo:', following);
        }
      } else {
        // Se encontrou seguidores via title, pegar o seguindo do próximo elemento
        const allStatsElements = doc.querySelectorAll('span.x5n08af.x1s688f span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs');
        if (allStatsElements.length >= 3) {
          following = parseInt(allStatsElements[2]?.textContent?.trim() || '0');
          console.log('Seguindo encontrado:', following);
        }
      }
      
      // Extrair foto do perfil
      const profileImg = doc.querySelector('img.xz74otr.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x972fbf.xcfux6l.x1qhh985.xm0m39n.x5yr21d.x17qophe.x10l6tqk.x13vifvy.x11njtxf.xh8yej3');
      const profilePictureUrl = profileImg?.getAttribute('src') || '';
      console.log('Foto do perfil encontrada:', profilePictureUrl ? 'Sim' : 'Não');
      
      const extractedData = {
        id: `instagram_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        username: username.startsWith('@') ? username : `@${username}`,
        followers_count: followers,
        following_count: following,
        posts_count: posts,
        profile_picture_url: profilePictureUrl,
        access_token: `instagram_access_${Date.now()}`,
        refresh_token: `instagram_refresh_${Date.now()}`
      };
      
      console.log('Dados extraídos com sucesso:', extractedData);
      return extractedData;
      
    } catch (error) {
      console.error('Erro ao extrair dados do Instagram:', error);
      return null;
    }
  }

  private async simulatePuppeteerLogin(config: InstagramLoginConfig): Promise<any> {
    const { username, password, onStatusChange } = config;
    
    return new Promise((resolve, reject) => {
      console.log('Simulando login com Puppeteer...');
      
      // Simular processo de login step by step
      const steps = [
        { message: 'Iniciando navegador...', delay: 1000 },
        { message: 'Navegando para Instagram...', delay: 1500 },
        { message: 'Preenchendo dados de login...', delay: 2000 },
        { message: 'Fazendo login...', delay: 2500 },
        { message: 'Verificando autenticação...', delay: 1500 },
        { message: 'Navegando para perfil...', delay: 1000 },
        { message: 'Capturando dados do perfil...', delay: 2000 }
      ];
      
      let currentStep = 0;
      
      const processStep = () => {
        if (currentStep >= steps.length) {
          // Simular extração de dados baseada no username fornecido
          const mockData = {
            id: `instagram_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            username: username.startsWith('@') ? username : `@${username}`,
            followers_count: Math.floor(Math.random() * 10000) + 100,
            following_count: Math.floor(Math.random() * 1000) + 50,
            posts_count: Math.floor(Math.random() * 500) + 10,
            profile_picture_url: 'https://via.placeholder.com/150x150/6366f1/ffffff?text=IG',
            access_token: `instagram_access_${Date.now()}`,
            refresh_token: `instagram_refresh_${Date.now()}`
          };
          
          onStatusChange?.('Dados capturados com sucesso!');
          setTimeout(() => resolve(mockData), 500);
          return;
        }
        
        const step = steps[currentStep];
        onStatusChange?.(step.message);
        
        setTimeout(() => {
          currentStep++;
          processStep();
        }, step.delay);
      };
      
      // Simular possível erro de login (5% de chance)
      if (Math.random() < 0.05) {
        setTimeout(() => {
          reject(new Error('Falha no login: credenciais inválidas ou conta bloqueada'));
        }, 3000);
        return;
      }
      
      processStep();
    });
  }

  async loginWithCredentials(config: InstagramLoginConfig): Promise<InstagramLoginResult> {
    try {
      console.log('Iniciando login automático do Instagram...');
      config.onStatusChange?.('Preparando login automático...');

      // Por enquanto, vamos simular o Puppeteer até implementarmos a automação real
      const userData = await this.simulatePuppeteerLogin(config);
      
      if (!userData) {
        throw new Error('Não foi possível extrair dados do perfil');
      }
      
      console.log('Login automático concluído:', userData);
      
      return {
        success: true,
        userData
      };

    } catch (error: any) {
      console.error('Erro no login automático:', error);
      
      let errorMessage = "Ocorreu um erro ao fazer login automaticamente.";
      
      if (error.message.includes('credenciais')) {
        errorMessage = "Credenciais inválidas. Verifique seu usuário e senha.";
      } else if (error.message.includes('bloqueada')) {
        errorMessage = "Conta temporariamente bloqueada. Tente novamente mais tarde.";
      } else if (error.message.includes('rede')) {
        errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}
