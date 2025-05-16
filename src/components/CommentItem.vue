<script setup>
import ReadMore from './ReadMore.vue';
import UserAvatar from './UserAvatar.vue';
defineProps({
    id: {
        type: [String, Number],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author_name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <div class="relative">
        <div class="absolute w-3 h-3 bg-gray-200 rounded-full -left-1.5 border border-white"></div>
        <div class="flex items-center mb-1 min-w-0">
            <user-avatar :name="author_name" :avatar="avatar"/>
            <span class="font-medium text-sm truncate">{{ author_name }}</span>
            <span class="text-xs text-gray-500 ml-2 shrink-0">1 hour ago</span>
        </div>
        <div class="bg-gray-100 p-3 rounded-lg text-sm text-gray-600 ml-8">
            <ReadMore max-height="120px">
                <p>I've reviewed the initial draft and added some technical specifications for the implementation phase. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum nobis enim quas magni perspiciatis doloremque id, veniam doloribus dolore optio illum dicta labore inventore quos cum unde cumque ullam, amet ad ducimus delectus quam non? Dolorem quo suscipit ab fugiat quia! Animi, magnam iste. Sed a, veritatis repellat voluptatum vitae fuga ipsam. Id voluptatibus impedit tempore laboriosam, quasi eos, corporis nesciunt maxime voluptates consectetur saepe ab. Sit, deserunt! Sequi mollitia totam temporibus earum facere vero iusto cum quia rem provident ea eius repellat, molestias fugit aspernatur, tempore laboriosam. Earum facere minima officia, in maxime sit, non voluptates reprehenderit iure labore esse quia itaque? Dolorem, sapiente magnam ipsa a omnis saepe sint velit nemo distinctio aspernatur recusandae ducimus odio, obcaecati ut nesciunt aut error. Natus architecto obcaecati, blanditiis iure necessitatibus dignissimos ut aliquid rerum corrupti eveniet Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, ratione aspernatur praesentium ducimus consequuntur veniam, unde doloremque harum ab excepturi a animi nobis voluptatum ut esse at rem iusto sed magnam. Voluptatum unde exercitationem facere labore quae quam, quo pariatur debitis officiis molestias minus? Asperiores corrupti libero eius saepe ratione. Incidunt quibusdam eaque impedit suscipit velit recusandae ad, quod asperiores sapiente reiciendis possimus voluptates quam magnam dicta numquam? Repellendus rerum magni recusandae. Nam eum magni sequi fugit aliquam reprehenderit nesciunt placeat dicta ullam molestias explicabo, ea officia aperiam velit! Sint, provident pariatur odio recusandae deserunt unde optio fugit perspiciatis quo. Possimus numquam exercitationem id ea vel temporibus laborum nobis doloremque minima voluptates. Quo eius, illo illum ratione animi pariatur molestias omnis voluptas corporis unde et similique in error velit, eos itaque, reiciendis optio aut. Quisquam mollitia atque odit impedit dolorem voluptates praesentium expedita doloribus alias iure pariatur, quod quaerat. Iusto explicabo voluptatem cum blanditiis rem officia veniam voluptate numquam dolore praesentium rerum illum ratione excepturi suscipit temporibus sed voluptates veritatis alias in similique, dolorum doloremque accusantium recusandae error! Doloribus vitae nostrum facere. At aliquid consequatur dolor pariatur error vel ea repudiandae, accusantium, ratione maiores, commodi odio possimus sequi numquam exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptatibus similique ratione excepturi dignissimos error ullam, obcaecati perspiciatis, vero nostrum debitis aut labore, magnam quis eveniet eius tempore aliquid? Perferendis culpa minima placeat repellendus esse ducimus quos ipsam optio consequatur sequi adipisci impedit distinctio, natus provident debitis fugiat sapiente cupiditate obcaecati suscipit. Excepturi dicta ex in numquam voluptates eos cumque, alias autem temporibus dolorem praesentium nobis itaque laudantium quia consectetur inventore provident, corporis ipsam modi rem quo. Deleniti perferendis accusantium dolor facilis maiores commodi tenetur sequi voluptas non rerum eligendi, ab magni aut? Eveniet sed quia velit sint magni harum excepturi hic repudiandae unde ipsa accusamus aperiam perferendis eum, quibusdam eaque eos culpa at quasi quam veritatis pariatur, error itaque nulla. Harum quidem eligendi, labore et autem eum ipsa cum, tenetur facere excepturi explicabo, maxime consectetur sapiente nisi modi expedita consequatur veniam facilis dolorum quos provident tempore dolor voluptas molestiae! Quam nostrum fuga dolore molestiae iure delectus a sed sit consectetur soluta quaerat et illo, perferendis officia neque quasi amet tenetur adipisci dicta voluptas! Vero, minus iure nulla doloremque mollitia modi suscipit nam officia animi velit enim voluptatum consectetur non exercitationem quibusdam. Facere laboriosam ad pariatur rem dolore mollitia nobis repellendus reiciendis incidunt vero, itaque corporis culpa tenetur ipsa velit accusamus blanditiis maiores ex molestias. Iste, eveniet! Magni, aperiam. Eaque vitae, laborum labore ex magnam fugiat voluptatem necessitatibus reiciendis quas quisquam a rem expedita hic officiis veritatis tempore quae dolore delectus velit! Laudantium cum eius, delectus earum vero id nemo quaerat dolores quis quo quos nesciunt distinctio et laboriosam repudiandae quia sint reprehenderit architecto corporis asperiores ipsa! Consectetur dolorem nesciunt ducimus illo, natus labore aut deleniti quibusdam a eaque maiores architecto molestias repudiandae voluptas sint non provident asperiores! Officiis expedita nobis laborum voluptatum nesciunt excepturi maxime, molestiae voluptatem fuga eius!</p>
            </ReadMore>
        </div>
    </div>
</template>