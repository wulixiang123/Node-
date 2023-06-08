/*  
  需求：
    1. 要求部分属性必选，部分属性可选
      
    2. 要求所有属性必选

    3. 要求所有属性可选
      
*/
// 1. 要求部分属性必选，部分属性可选
interface Person {
  name: string;
  age: number;
  sex?: string;
}

const p1: Person = {
  name: "jack",
  age: 18,
};

// 2. 要求所有属性必选
// interface Person1 {
//   name: string;
//   age: number;
//   sex: string;
// }

type Person1 = Required<Person>; // 必选

const p2: Person1 = {
  name: "jack",
  age: 18,
  sex: "男",
};

// 3. 要求所有属性可选
// interface Person2 {
//   name?: string;
//   age?: number;
//   sex?: string;
// }

type Person2 = Partial<Person>; // 可选

const p3: Person2 = {
  // name: "jack",
  // age: 18,
  sex: "男",
};

interface MovieItem {
  episodes_info: string;
  rate: string;
  cover_x: number;
  title: string;
  url: string;
  playable: boolean;
  cover: string;
  id: string;
  cover_y: number;
  is_new: boolean;
}

// 从某个类型中挑选一些属性组成新的类型
type Movie1 = Pick<MovieItem, "id" | "title" | "cover">;

const m: Movie1 = {
  id: "123",
  title: "电影",
  cover: "图片",
};

type Movie2 = Pick<
  MovieItem,
  "episodes_info" | "rate" | "cover_x" | "title" | "url"
>;

// 从某个类型中排除部分属性，剩下属性组成新的类型
type Movie3 = Omit<MovieItem, "is_new" | "id">;
type Movie4 = Omit<MovieItem, "is_new">;
