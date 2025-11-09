" Project Vim config for next-edge
" Lightweight defaults geared for TypeScript/React and this repo

" Basics
set nocompatible
syntax on
filetype plugin indent on

" UI
set number relativenumber
set cursorline
set signcolumn=yes
set splitright splitbelow
set termguicolors

" Editing behavior
set hidden
set nowrap
set expandtab
set shiftwidth=2
set tabstop=2
set softtabstop=2
set autoindent
set smartindent

" Searching
set ignorecase
set smartcase
set incsearch
set hlsearch

" Clipboard/mouse (optional; comment if undesired)
set clipboard=unnamedplus
set mouse=a

" Completion/navigation
set wildmenu
set wildmode=longest:full,full
set wildignore+=node_modules/**,dist/**,build/**,.next/**,coverage/**,storybook-static/**

" Prefer ripgrep for :grep if available
if executable('rg')
  set grepprg=rg\ --vimgrep\ --smart-case
  set grepformat=%f:%l:%c:%m
endif

" Highlight trailing whitespace (non-destructive)
highlight ExtraWhitespace ctermbg=red guibg=#3d1f1f
match ExtraWhitespace /\s\+$/

" Filetype-specific indentation (2 spaces for common web files)
augroup ProjectIndent
  autocmd!
  autocmd FileType javascript,javascriptreact,typescript,typescriptreact,json,yaml,css,scss,html,markdown setlocal shiftwidth=2 tabstop=2 softtabstop=2 expandtab
  autocmd FileType make setlocal noexpandtab shiftwidth=8 softtabstop=0
augroup END

" Ensure TSX recognized in classic Vim
autocmd BufNewFile,BufRead *.tsx set filetype=typescriptreact

" Leader
let mapleader = " "

" Helpers: run Biome/Vitest on current file (requires pnpm)
nnoremap <leader>bf :w<CR>:!pnpm exec biome format --write %<CR>
nnoremap <leader>bl :w<CR>:!pnpm exec biome check %<CR>
nnoremap <leader>ut :w<CR>:!pnpm vitest run %<CR>

" Keep text within ~100 cols visual guide (no hard wrap)
set colorcolumn=100

