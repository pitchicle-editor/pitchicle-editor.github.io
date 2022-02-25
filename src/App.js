import React, { Component } from 'react';
import { useState} from 'react';

import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'

import nameList from './nameList.json'

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      // 'underLine',
      'strikeThrough',
      // 'subscript',
      // 'superscript',
      // 'highlight',
      '|',
      // 'fontfamily',
      // 'fontcolor',
      // 'fontBackgroundColor',
      // 'fontSize',
      // '|',
      // 'alignment',
      'link',
      'bulletedList',
      'numberedList',
      'TodoList',
      '|',
      'outdent',
      'indent',
      '|',
      // 'imageUpload',
      'imageInsert',
      'BlockQuote',
      'InsertTable',
      'MediaEmbed',
      'SpecialCharacters',
      '|',
      'undo',
      'redo',
      '|',
      'horizontalLine',
      'pageBreck',
      '|',
      'code',
      'codeBlock',
      // '|',
      // 'TextPartLanguage',
      '|',
      'SourceEditing'

      ]
    },
    heading: {
      options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
    ]
  }
};

const App = () => {
  // console.log(nameList)
  const [mdData, setMdData] = useState('')
  const [tagInput, setTagInput] = useState('')

  const [userData, setUserData] = useState({
    layout: 'post',
    title: '',
    author: '',
    comments: true,
    date: '',
    use_math: true,
    tags: [],

    context:'',
    fileName:''
  })  

  const getValue = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    })
    console.log(userData)
  };

  const getTag = e => {
    setTagInput(e.target.value)
  }

  const addTag = () => {
    setUserData({
      ...userData,
      tags: [...userData.tags,tagInput]
    })
    console.log(userData)
  };

  const downLoader = () => {
    let today = new Date()

    let title = userData.title

    if ((title===null)||(title===undefined)||(title==='')){
      alert('제목이 잘못되었습니다.')
      return false
    }

    let fileName = userData.fileName

    if ((fileName===null)||(fileName===undefined)||(fileName==='')){
      alert('파일이름이 잘못되었습니다.')
      return false
    }


    let name = nameList[userData.author]

    if ((name===null)||(name===undefined)){
      alert('저자명이 잘못되었습니다.')
      return false
    }


    let data =
`---
layout: post
title: ${userData.title}
author: ${name}
comments: true
date: ${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${(String(today.getDate()).padStart(2,'0'))} ${(String(today.getHours()).padStart(2,'0'))}:${(String(today.getMinutes()).padStart(2,'0'))}
use_math: true
tags: [computer-science]
---
${userData.context}
`
    console.log(data)
    var FileSaver = require('file-saver');
    var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${(String(today.getDate()).padStart(2,'0'))}-${userData.fileName}.md`);
  }

  return (
      <div className="App">
          <h2>Pitchicle Online Markdown Editor</h2>
          <CKEditor
              editor={ Editor }
              config={ editorConfiguration }
              data=" "
              onReady={ editor => {
                  console.log( '로딩 완료' );
              } }
              onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  setMdData(data)
                  console.log( data );
              } }
          />
          <input placeholder='제목' name='title' onChange={getValue} autoComplete='off'/><br/>
          <input placeholder='파일이름(영어)' name='fileName' onChange={getValue} autoComplete='off'/><br/>

          <input placeholder='저자 ex)홍길동' name='author' onChange={getValue} autoComplete='off'/><br/>

          <input placeholder='태그' onChange={getTag} autoComplete='off'/><button onClick={addTag}>추가</button> {userData.tags.map( data => (data)+' ' )}<br/>
          <textarea placeholder='본문' onChange={getValue} name='context' autoComplete='off'/><br/>
          <button onClick={downLoader}>다운로드</button>
      </div>
);
}

export default App;