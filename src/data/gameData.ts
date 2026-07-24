import { Level } from '../types';

// ==========================================
// INSTRUÇÕES PARA ADICIONAR ÁUDIOS E VÍDEOS:
// ==========================================
// 1. Faça o upload dos arquivos de áudio (.mp3) e vídeo (.mp4) na pasta 'public' do projeto (usando o painel de arquivos à esquerda).
// 2. Coloque o caminho exato aqui embaixo, começando com '/' (ex: '/meu-video.mp4').

export const gameLevels: Record<string, Level[]> = {
  classicos: [
    {
      id: 'c1',
      movieTitle: 'A Empregada', // <-- ATENÇÃO: Altere para o nome correto deste filme!
      options: ['A Empregada', 'Os Bons Companheiros', 'Scarface', 'Cassino', 'O Irlandês'],
      audioUrl: '/filme1.mp3', // O navegador consegue extrair apenas o áudio do arquivo de vídeo automaticamente!
      videoUrl: '/filme1.mp4', 
    },
    {
      id: 'c2',
      movieTitle: 'Star Wars: O Império Contra-Ataca',
      options: ['Star Trek: A Ira de Khan', 'Star Wars: Uma Nova Esperança', 'Star Wars: O Império Contra-Ataca', 'Duna', 'O Quinto Elemento'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'c3',
      movieTitle: 'Matrix',
      options: ['O Exterminador do Futuro', 'Blade Runner', 'A Origem', 'Matrix', 'Minority Report'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'c4',
      movieTitle: 'O Exterminador do Futuro 2',
      options: ['RoboCop', 'Alien', 'Matrix', 'O Exterminador do Futuro', 'O Exterminador do Futuro 2'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'c5',
      movieTitle: 'De Volta para o Futuro',
      options: ['Caça-Fantasmas', 'E.T. O Extraterrestre', 'De Volta para o Futuro', 'Goonies', 'Karatê Kid'],
      audioUrl: '',
      videoUrl: '',
    }
  ],
  marvel: [
    {
      id: 'm1',
      movieTitle: 'Homem de Ferro',
      options: ['Capitão América: O Primeiro Vingador', 'Homem de Ferro', 'Thor', 'O Incrível Hulk', 'Os Vingadores'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm2',
      movieTitle: 'Os Vingadores',
      options: ['Liga da Justiça', 'Vingadores: Era de Ultron', 'Os Vingadores', 'X-Men', 'Quarteto Fantástico'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm3',
      movieTitle: 'Guardiões da Galáxia',
      options: ['Star Wars', 'Guardiões da Galáxia', 'Thor: Ragnarok', 'Vingadores: Guerra Infinita', 'Homem-Formiga'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm4',
      movieTitle: 'Vingadores: Guerra Infinita',
      options: ['Vingadores: Ultimato', 'Capitão América: Guerra Civil', 'Os Vingadores', 'Vingadores: Era de Ultron', 'Vingadores: Guerra Infinita'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm5',
      movieTitle: 'Homem-Aranha: Sem Volta Para Casa',
      options: ['Homem-Aranha: De Volta ao Lar', 'O Espetacular Homem-Aranha 2', 'Homem-Aranha 3', 'Homem-Aranha: Sem Volta Para Casa', 'Homem-Aranha: Longe de Casa'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm6',
      movieTitle: 'O Incrível Hulk',
      options: ['O Incrível Hulk', 'Homem de Ferro', 'Thor', 'Os Vingadores', 'Capitão América: O Primeiro Vingador'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm7',
      movieTitle: 'Homem de Ferro 2',
      options: ['Capitão América: O Primeiro Vingador', 'Homem de Ferro 2', 'Homem de Ferro 3', 'Homem de Ferro', 'Thor'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm8',
      movieTitle: 'Thor',
      options: ['Thor: O Mundo Sombrio', 'Loki', 'Thor', 'Thor: Ragnarok', 'Vingadores'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm9',
      movieTitle: 'Capitão América: O Primeiro Vingador',
      options: ['Capitão América: O Soldado Invernal', 'Capitão América: Guerra Civil', 'Os Vingadores', 'Capitão América: O Primeiro Vingador', 'O Incrível Hulk'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm10',
      movieTitle: 'Homem de Ferro 3',
      options: ['Vingadores: Era de Ultron', 'Homem de Ferro 3', 'Guardiões da Galáxia', 'Homem-Formiga', 'Homem de Ferro 2'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm11',
      movieTitle: 'Thor: O Mundo Sombrio',
      options: ['Thor', 'Thor: O Mundo Sombrio', 'Thor: Ragnarok', 'Os Vingadores', 'Guardiões da Galáxia'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm12',
      movieTitle: 'Capitão América: O Soldado Invernal',
      options: ['Capitão América: O Primeiro Vingador', 'Os Vingadores', 'Capitão América: Guerra Civil', 'Capitão América: O Soldado Invernal', 'Viúva Negra'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm13',
      movieTitle: 'Vingadores: Era de Ultron',
      options: ['Os Vingadores', 'Vingadores: Era de Ultron', 'Vingadores: Guerra Infinita', 'Vingadores: Ultimato', 'Capitão América: Guerra Civil'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm14',
      movieTitle: 'Homem-Formiga',
      options: ['Guardiões da Galáxia', 'Homem-Formiga', 'Homem-Formiga e a Vespa', 'Doutor Estranho', 'Homem-Aranha: De Volta ao Lar'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm15',
      movieTitle: 'Capitão América: Guerra Civil',
      options: ['Capitão América: O Soldado Invernal', 'Vingadores: Era de Ultron', 'Capitão América: Guerra Civil', 'Vingadores: Guerra Infinita', 'Pantera Negra'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm16',
      movieTitle: 'Doutor Estranho',
      options: ['Thor: Ragnarok', 'Doutor Estranho', 'Doutor Estranho no Multiverso da Loucura', 'Eternos', 'Shang-Chi e a Lenda dos Dez Anéis'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm17',
      movieTitle: 'Guardiões da Galáxia Vol. 2',
      options: ['Guardiões da Galáxia', 'Guardiões da Galáxia Vol. 2', 'Guardiões da Galáxia Vol. 3', 'Thor: Ragnarok', 'Capitã Marvel'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm18',
      movieTitle: 'Homem-Aranha: De Volta ao Lar',
      options: ['Homem-Aranha: Longe de Casa', 'Homem-Aranha: Sem Volta Para Casa', 'Homem-Aranha: De Volta ao Lar', 'Venom', 'Capitão América: Guerra Civil'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm19',
      movieTitle: 'Thor: Ragnarok',
      options: ['Thor: O Mundo Sombrio', 'Thor: Ragnarok', 'Thor: Amor e Trovão', 'Guardiões da Galáxia Vol. 2', 'Vingadores: Guerra Infinita'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm20',
      movieTitle: 'Pantera Negra',
      options: ['Pantera Negra', 'Pantera Negra: Wakanda Para Sempre', 'Capitão América: Guerra Civil', 'Vingadores: Guerra Infinita', 'Falcão e o Soldado Invernal'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm21',
      movieTitle: 'Homem-Formiga e a Vespa',
      options: ['Homem-Formiga', 'Homem-Formiga e a Vespa: Quantumania', 'Homem-Formiga e a Vespa', 'Vingadores: Ultimato', 'Capitã Marvel'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm22',
      movieTitle: 'Capitã Marvel',
      options: ['Guardiões da Galáxia', 'As Marvels', 'Vingadores: Ultimato', 'Viúva Negra', 'Capitã Marvel'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm23',
      movieTitle: 'Vingadores: Ultimato',
      options: ['Vingadores: Guerra Infinita', 'Vingadores: Era de Ultron', 'Vingadores: Ultimato', 'Homem-Aranha: Longe de Casa', 'Thor: Ragnarok'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm24',
      movieTitle: 'Homem-Aranha: Longe de Casa',
      options: ['Homem-Aranha: De Volta ao Lar', 'Homem-Aranha: Longe de Casa', 'Homem-Aranha: Sem Volta Para Casa', 'Vingadores: Ultimato', 'Doutor Estranho no Multiverso da Loucura'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'm25',
      movieTitle: 'Viúva Negra',
      options: ['Capitão América: O Soldado Invernal', 'Vingadores: Era de Ultron', 'Viúva Negra', 'Gavião Arqueiro', 'Capitã Marvel'],
      audioUrl: '',
      videoUrl: '',
    }
  ],
  disney: [
    {
      id: 'd1',
      movieTitle: 'O Rei Leão',
      options: ['Aladdin', 'Tarzan', 'Mogli: O Menino Lobo', 'O Rei Leão', 'Irmão Urso'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'd2',
      movieTitle: 'Toy Story',
      options: ['Monstros S.A.', 'Vida de Inseto', 'Toy Story', 'Os Incríveis', 'Procurando Nemo'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'd3',
      movieTitle: 'Procurando Nemo',
      options: ['A Pequena Sereia', 'Procurando Nemo', 'Moana', 'O Espanta Tubarões', 'Lilo & Stitch'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'd4',
      movieTitle: 'Divertida Mente',
      options: ['Zootopia', 'Up: Altas Aventuras', 'Viva: A Vida é uma Festa', 'Divertida Mente', 'Soul'],
      audioUrl: '',
      videoUrl: '',
    },
    {
      id: 'd5',
      movieTitle: 'Shrek', // Embora seja Dreamworks, muitas pessoas associam! Você pode trocar se quiser.
      options: ['A Era do Gelo', 'Madagascar', 'Shrek', 'Enrolados', 'A Princesa e o Sapo'],
      audioUrl: '',
      videoUrl: '',
    }
  ]
};
