import React from 'react';
import { SearchForm } from './Ui';

export default function Search() {
  return (
    <div className="min-h-screen bg-slate-950 pt-32 px-14">
      <h1 className="text-3xl font-bold text-slate-100 mb-8">검색 결과</h1>
      <SearchForm />
      <div className="mt-12 text-slate-400">
        검색어를 입력해 주세요.
      </div>
    </div>
  );
}
