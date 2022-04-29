<script setup>
  import { ref, watch, onMounted, onBeforeMount } from 'vue';
  import { useState } from '../lib/state';

  const props = defineProps(['id']);
  const [id, setId] = useState(props.id);
  watch(props, () =>{
    setId(props.id);
  })

  const [selectedItem, setSelectedItem] = useState('literature');

  const itemList = [
    // 'about',
    // 'keywords',
    // 'INFs',
    'literature',
    // 'papers',
    // 'community'
  ]


  const aboutArticles = [
    { ref: 'ref1', quote: 'quote1' },
    { ref: 'ref2', quote: 'quote2' },
    { ref: 'ref3', quote: 'quote3' }
  ]

  const literatureLists = [
    { year: 'year1', title: 'title1' },
    { year: 'year2', title: 'title2' },
    { year: 'year3', title: 'title3' }
  ]
</script>

<template>
  <div class="h-12/12 flex flex-col">
    <div class="bar w-12/12 h-5 text-sm">
      <ul class="flex flex-nowrap">
        <template v-for="item in itemList">
          <li :class="item === selectedItem ? 'stressed' : ''" @click="setSelectedItem(item)">{{ item }}</li>
        </template>
      </ul>
    </div>
    <div class="w-12/12 flex-1 text-xs">
      <template v-if="selectedItem === 'about'">
        <div class="h-12/12 p-3 divide-y divide-black">
          <template v-for="article in aboutArticles">
            <div class="p-1">
              <div>{{ article.ref }}</div>
              <div>{{ article.quote }}</div>
            </div>
          </template>
        </div>
      </template>
      <template v-if="selectedItem === 'keywords'">
        <div class="h-12/12 p-3 flex flex-row divide-x divide-black">
          <div class="w-1/4">keywords</div>
          <div class="w-3/4"></div>
        </div>
      </template>
      <template v-if="selectedItem === 'literature'">
        <div class="h-12/12 p-3">
          <template v-for="lit in literatureLists">
            <!-- <div class=""> -->
              <table>
                <tbody>
                  <tr>
                    <td>{{ lit.year }}</td>
                    <td>{{ lit.title }}</td>
                  </tr>
                </tbody>
              </table>
            <!-- </div> -->
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .bar {
    border-bottom: 1px solid black;
    /* box-sizing: border-box */
  }

  li {
    /* width: 100%; */
    padding-right: 15px;
    opacity: 0.3;
    cursor: default;
  }
  li:hover {
    opacity: 1;
    /* font-weight: 600; */
    /* border-bottom: 1px solid black; */
    /* box-sizing: border-box */
  }

  .stressed {
    opacity: 1;
  }
</style>