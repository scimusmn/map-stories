import { Meteor } from 'meteor/meteor';
import { Images } from '../../../api/images/images.js';
import _ from 'lodash';
import sizeOf from 'image-size';

// If the database is empty on server start, create some sample data.

Meteor.startup(() => {
  Images.remove({});
  if (Images.find().count() === 0) {

    const data = [

      // Coon rapids
      {
        place: 'Coon Rapids',
        name: 'Coon Rapids Dam',
        filename: 'MA6-9-CR-p1.jpg',
        type: 'historic',
        desc: [
          'The Northern Mississippi Power Company began construction of a dam and hydroelectric power station at Coon Rapids in 1913. Although some local leaders argued that the dam should include locks, the Army Corps of Engineers determined that the river above the dam was not navigable, and the power company did not include a lock.',
          'A crew of more than 1,000 worked day and night to build the dam. They lived in a nearby camp complete with streets, a store, clubhouse, hospital, office buildings, school, dormitories, dance hall, movie theater and billiard parlor.',
          'In 1966 the hydroelectric station closed, and three years later the Hennepin County Park Board purchased the site.',
        ],
        caption: 'The Coon Rapid Dam and hydroelectric power station in 1928.',
        credit: 'Paul W. Hamilton / Minnesota Historical Society / Public domain',
        date: 1928,
      },

      {
        place: 'Coon Rapids',
        name: 'Men Lounging',
        filename: 'HE2-1-r30.jpg',
        type: 'historic',
        desc: [
          'During the mid-1800s, a series of “Red River ox cart trails” connected the Selkirk settlement, near present day Winnipeg, Canada, to the Mississippi River’s head of navigation at Saint Paul. Wooden carts pulled by oxen transported loads of furs south and carried food supplies, ammunition and manufactured goods on the return north.',
          'The trails accelerated the development of Minnesota and North Dakota. Communities grew along the trails, and in some places modern highways follow the routes once taken by the ox carts.',
        ],
        caption: 'Red River ox cart drivers taking a rest along the trail in 1860. ',
        credit: 'Minnesota Historical Society / Public domain',
        date: 1860,
      },

      // Bohemian Flats
      {
        place: 'Bohemian Flats',
        name: 'poorest-residents',
        filename: 'MH5-9-MP1E-p3-original.jpg',
        type: 'historic',
        desc: [
          'The city’s poorest residents often lived in the least desirable areas like low lying areas along the river prone to frequent flooding. Bohemian Flats was one such poor neighborhood in Minneapolis. Although called Bohemian Flats, people of many nationalities lived there until the early 1930s.',
        ],
        caption: 'Bohemian Flats in 1880.',
        credit: 'Emil Hilgarde / Minnesota Historical Society / Public domain',
        date: 1880,
      },
      {
        place: 'Bohemian Flats',
        name: 'collecting-wood',
        filename: 'GT2-52-p17.jpg',
        type: 'historic',
        desc: [
          'Bohemian Flats lay just downstream from Saint Anthony Falls. Residents took advantage of this location, supplementing their income by gathering lumber and logs washed downstream from the lumber mills at the falls.',
        ],
        caption: 'An illustration of residents collecting wood at Bohemian Flats in 1887.',
        credit: 'Will S. Horton / Minnesota Historical Society / Public domain',
        date: 1887,
      },
      {
        place: 'Bohemian Flats',
        name: 'I-35 Bridge Collapse',
        filename: 'I35_Bridge_Collapse_4crop.jpg',
        type: 'historic',
        desc: [
          'On the evening of August 1, 2007, the Interstate 35W bridge over the Mississippi River collapsed. Thirteen people died and 145 suffered injuries.',
          'During routine inspections prior to it’s collapse, the Department of Transportation had rated the bridge “structurally deficient.” In 2007, approximately 75,000 other bridges in the United States had received this same rating.',
          'The bridge collapse shone a spotlight on the nation’s crumbling infrastructure. In the days following the collapse, bridge inspections were increased around the country.',
        ],
        caption: '',
        credit: 'Courtesy Mike Wills / CC-BY-SA-2.0',
        date: 1928,
        customHeight: 440,
      },

      // Lock and Dam #1
      {
        place: 'Lock and Dam #1',
        name: 'Meeker island',
        filename: 'Meeker.jpg',
      },

      // SAF
      {
        place: 'Saint Anthony Falls',
        name: 'SAF 1786',
        filename: 'saf-1786.jpg',
        type: 'historic',
        desc: [
          'Long before the first European explorers "discovered" the falls, Native Americans who lived in the area knew them well.',
          'Archaeological evidence shows that people lived in the area as long as 12,000 years ago. When the first Europeans arrived in 1680, the Dakota tribe controlled the area.',
        ],
        caption: '',
        credit: 'Jean Alexis Fournier / Minnesota Historical Society / Public domain',
        date: 1680,
      },
      {
        place: 'Saint Anthony Falls',
        name: 'Hennepin at SAF',
        filename: 'Henn@SAF.jpg',
        type: 'historic',
        desc: [
          'Motivated by a search for easy passage to the Pacific Ocean, the quest to control the area’s rich fur resources, and a desire to spread Christianity, small groups of French explorers traveled along parts of the Upper Mississippi River in the 1670s.',
          'Two of those explorers, Father Louis Hennepin and Antoine Auguelle, became the first Europeans to see the falls in 1680. Father Hennepin named them for his patron saint, Anthony of Padua.',
        ],
        caption: 'A depiction of Father Louis Hennepin and Antoine Auguelle at Saint Anthony Falls in 1680.',
        credit: 'J. N. Marchand / Minnesota Historical Society / Public domain',
        date: 1680,
      },
      {
        place: 'Saint Anthony Falls',
        name: 'saf-eastman',
        filename: 'saf-eastman.jpg',
        type: 'historic',
        desc: [
          'In the early 1820s soldiers from Fort Snelling built two small mills on the west side of Saint Anthony Falls. For the first time people harnessed the power of the falls to mill lumber and grain. Before long Saint Anthony Falls became a major milling center leading to the birth of the city of Minneapolis.',
        ],
        caption: 'The Fort Snelling mills are visible on the left side of this illustration.',
        credit: 'Artist: Seth Eastman, Engraver: J.C. McRae / Minnesota Historical Society / Public domain',
        date: '182u',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'franklin-steele',
        filename: 'por-15571-p1.jpg',
        type: 'historic',
        desc: [
          'Franklin Steele, a storekeeper at Fort Snelling and part owner of the Saint Croix Falls Lumber Company, built the first dam and commercial sawmill at Saint Anthony Falls in 1848. Other mills quickly followed and for the next 100 years the falls were a major center of commercial milling.',
        ],
        caption: '',
        credit: 'Minnesota Historical Society / Public domain',
        date: '',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'lumber-mills',
        filename: 'MH5-9-MP4-31-p36.jpg',
        type: 'historic',
        desc: [
          'By 1869, 18 lumber mills operated at Saint Anthony Falls. As the millers dammed the falls, the natural free-flowing waterfall described by the early explorers all but disappeared.',
        ],
        caption: 'Platform mills on the west side of the falls in about 1868.',
        credit: 'Minnesota Historical Society / Public domain',
        date: '',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'milling',
        filename: 'HE5-44-r1.jpg',
        type: 'historic',
        desc: [
          'In the mid-1800s, water power at Saint Anthony Falls powered a booming lumber industry. Milling didn’t just change the falls. Lumberjacks clear-cut the northern forests of Minnesota and Wisconsin and floated the logs downstream to the mills.',
          'Much of the resulting lumber flowed downriver to Saint Louis. But the cities of Saint Anthony, located on the east side of the falls, Minneapolis and Saint Paul began to command more and more of the mills’ output to support the needs of their rapidly growing populations.',
        ],
        caption: 'Log drivers working above Saint Anthony Falls in 1881.',
        credit: 'Michael Nowack / Minnesota Historical Society / Public domain',
        date: '',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'eastman-tunnel',
        filename: 'MH5-9-MP4-32-p16.jpg',
        type: 'historic',
        desc: [
          'In 1869, a tunnel being dug to bring waterpower to a mill on Nicollet Island collapsed. Water rushed through the collapsed tunnel threatening the stability of Saint Anthony Falls.',
          'Lumbermen, shopkeepers, lawyers, bakers and barbers all rushed to the scene and tried to plug the leak with logs and rocks. When their efforts failed, they called on the Army Corps of Engineers to save the falls. In 1870, Congress gave the Corps $50,000 to repair the falls. After three years of working to plug leaks, they realized it required more drastic measures.',
          'The Corps of Engineers built a massive wall beneath the falls with a wooden apron protecting the edge from further erosion. Eventually, the Corps of Engineers replaced the wooden apron with the concrete apron that characterizes the falls today.',
        ],
        caption: 'Water rushed through the collapsed Eastman Tunnel on Hennepin Island in 1869.',
        credit: 'William Henry Illingworth / Minnesota Historical Society / Public domain',
        date: '1869',
      },
      {
        place: 'Saint Anthony Falls',
        name: 'flour-mill',
        filename: 'Ferrell_333.jpg',
        type: 'historic',
        desc: [
          'The first commercial flour mill joined the lumber mills at Saint Anthony Falls in 1851. Over the decades that followed, industrialists built more and more flour mills at the falls. The lumber mills that once dominated the falls gradually relocated to north Minneapolis fueled by steam rather than water power. Flour milling became the new king at Saint Anthony Falls.',
        ],
        caption: '',
        credit: 'Minnesota Historical Society / Public domain',
        date: '1851',
      },

      // Fort Snelling
      {
        place: 'Fort Snelling',
        name: 'projectile-point',
        filename: 'projectile-point.jpg',
        type: 'historic',
        desc: [
          'As the glaciers of the last ice age retreated some 12,000 years ago, people began moving into the area that is now Minnesota. While relatively little is known about their lives, the Mississippi River likely served as an important transportation and trade route: the plants and animals found along it became a valuable food source.',
        ],
        caption: 'Archaeologists found this projectile point at Fort Snelling in the 1970s. It is likely at least 2,500 years old.',
        credit: 'TBD',
        date: '0001',
        order: 1,
      },
      {
        place: 'Fort Snelling',
        name: 'zebulon-pike',
        filename: 'por-20435-p2.jpg',
        type: 'historic',
        desc: [
          'Lieutenant Zebulon Pike arrived on the big island at the confluence of the Mississippi and Minnesota Rivers on September 21, 1805. He had traveled from Saint Louis on a mission to make alliances with the Dakota and Ojibwe and secure the best sites for military forts.',
          'The next day, Pike began negotiations with seven Dakota chiefs to obtain the land at the mouth of the Minnesota River. Even though only two of the Dakota leaders signed the treaty, the United States acquired 100,000 acres of land for $2,000. This land, which extended all the way to Saint Anthony Falls, eventually became the site of Fort Snelling.',
        ],
        caption: '',
        credit: 'Minnesota Historical Society / Public domain',
        date: '1805',
        order: 2,
      },
      {
        place: 'Fort Snelling',
        name: 'fort-snelling',
        filename: 'AV1988-45-18.jpg',
        type: 'historic',
        desc: [
          'Under the command of Colonel Josiah Snelling, the Army laid the cornerstone for a fort at the confluence of the Mississippi and Minnesota Rivers on September 10, 1820. The Army built Fort Snelling, as it was later named, to protect the fur trade from the British and to control the local Native Americans.',
        ],
        caption: '',
        credit: 'Minnesota Historical Society / Public domain',
        date: '1820',
        order: 3,
      },
      {
        place: 'Fort Snelling',
        name: 'snelling-gathering',
        filename: 'AV1991-85-35.jpg',
        type: 'historic',
        desc: [
          'When completed in 1825, Fort Snelling attracted settlers to the area and quickly became a regional center for trade and intertribal gatherings.'
        ],
        caption: '',
        credit: 'Seth Eastman / Minnesota Historical Society / Public domain',
        date: '1825',
        order: 4,
      },
      {
        place: 'Fort Snelling',
        name: 'captured-sioux',
        filename: 'Captured-Sioux-Indians.jpg',
        type: 'historic',
        desc: [
          'By 1862, the Dakota had ceded much of their land to the U.S. government in exchange for yearly payments. That summer, the government failed to make its payments and crop failures and poor hunting left many Dakota families hungry.',
          'On August 17, 1862, four Dakota men seeking food approached settlers on a farm in Acton Township. When the farmers refused, the Dakota killed five people. This was the beginning of a nearly six-week war between the Dakota and U.S. in which an estimated 700 people lost their lives.',
          'After the war, the Army force-marched more than 1,500 Dakota to a prison camp located along the river just below Fort Snelling. The prisoners – who were primarily women, children and elderly men – remained in the camp through the winter. They suffered malnutrition and disease outbreaks. An estimated 130–300 people died while in the camp.',
          '"Amid all this sickness and these great tribulations, it seemed doubtful at night whether a person would be alive in the morning.<br>—Tiwakan (also known as Gabriel Renville), a Sisseton Dakota held in the camp"',
        ],
        caption: 'The Dakota internment camp at Fort Snelling.',
        credit: 'Benjamin Franklin Upton / Minnesota Historical Society / Public domain',
        date: '1862',
        order: 5,
      },
      {
        place: 'Fort Snelling',
        name: 'snelling-little-six',
        filename: 'E91-1S-r5.jpg',
        type: 'historic',
        desc: [
          'After the 1862 U.S.-Dakota War, some Dakota fled north into Canada. Sakpedan (Little Six) and Wakanozhanzhan (Medicine Bottle) were among them. British agents captured them and turned them over to U.S. authorities in January 1864. A military commission at Fort Snelling tried them for their involvement in the war and sentenced them to death. They were hanged at Fort Snelling on November 11, 1865.',
          'Previously, the Army hanged 38 other Dakota men in Mankato, Minnesota for their involvement in the conflict. This remains the largest mass execution in U.S. history.',
        ],
        caption: 'Sakpedan (Little Six) and Wakanozhanzhan (Medicine Bottle) while being held prisoner at Fort Snelling.',
        credit: 'Joel Emmons Whitney / Minnesota Historical Society / Public domain',
        date: '1864',
        order: 6,
      },
      {
        place: 'Fort Snelling',
        name: 'snelling-spring',
        filename: 'MH5-9-F1-3CW-p7.jpg',
        type: 'historic',
        desc: [
          'The soldiers who built Fort Snelling camped near a natural water spring located a short distance northwest of the fort. It attracted civilian tradesmen and traders who settled at the spring in what is considered the first American settlement in Minnesota. Camp Coldwater, as it was known, boasted a population of 150 by the 1830s.',
          'In 1840, the military commander at Fort Snelling forced residents of Camp Coldwater to relocate off military property. Many of them moved to the east side of the river a few miles downstream from the fort. This new settlement would later become Saint Paul.',
        ],
        caption: 'The Spring at the site of Camp Coldwater in about 1900.',
        credit: 'Minnesota Historical Society / Public domain',
        date: '1900',
        order: 7,
      },
      {
        place: 'Fort Snelling',
        name: 'snelling-dred-scott',
        filename: 'por-20585-p1.jpg',
        type: 'historic',
        desc: [
          'Despite the 1820 Missouri Compromise, which forbid slavery north of the 3630’ latitude line in the territory gained through the Louisiana Purchase, between 15 and 30 enslaved African Americans lived and worked at Fort Snelling at any given time in the 1820s and 1830s.',
          'Dred and Harriet Scott, the two most famous slaves to reside at Fort Snelling, later argued that they should be free due to this violation of the Missouri Compromise. Although the U.S. Supreme Court ruled against them, their case stands as a major event in the national debate about slavery that culminated in the Civil War.',
        ],
        caption: 'Dred Scott in 1857.',
        credit: 'Minnesota Historical Society / Public domain ',
        date: '1857',
        order: 8,
      },
      {
        place: 'Fort Snelling',
        name: 'snelling-training',
        filename: 'E435-22-p3.jpg',
        type: 'historic',
        desc: [
          'Fort Snelling’s role as a frontier fort ended after the signing of the Treaty of Mendota in 1851, but the fort remained a valuable military asset until the Army decommissioned it in 1946.',
          '1861–1865 The fort served as a rendezvous and training center for nearly 25,000 troops during the Civil War.',
          '1898 Fort Snelling soldiers deployed to Cuba during the Spanish-American War.',
          '1917–1918 Fort Snelling processed troops leaving to fight in World War I. Officer training camps held at the fort prepared new officers for the war.',
          '1920s The Army trained National Guard officers at Civilian Military Training Camps held at the fort.',
          '1941–1945 During World War II, the Army ran a recruiting and reception center for draftees and recruits at Fort Snelling. The center processed up to 450 recruits per day.',
          '1944–1946 Fort Snelling hosted the Military Intelligence Service Language School. Students studied Japanese, Korean and Chinese languages and cultures to prepare for roles as interpreters and military intelligence agents.',
        ],
        caption: 'Soldiers at Fort Snelling training for World War I.',
        credit: 'Minnesota Historical Society / Public domain',
        date: '1857',
        order: 8,
      },

      {
        place: 'Saint Paul',
        name: 'Nothing',
        filename: 'example.jpg',
      },
      {
        place: 'Saint Paul',
        name: 'Something',
        filename: 'example.jpg',
        otherthing: 'test',
      },

      // Hastings
      {
        place: 'Hastings',
        name: 'Something',
        filename: 'Hastings1850-60.jpg',
      },

      // Mendota
      {
        place: 'Mendota',
        name: 'Native people above Mendota',
        filename: 'AV2004-88.jpg',
      },
      {
        place: 'Mendota',
        name: 'Sibley house painting',
        filename: 'SibleyHse1888.jpg',
      },

      // Mounds
      {
        place: 'Mounds Park',
        name: 'Mounds Park painting',
        filename: 'AV1991-85-33.jpg',
      },
    ];

    data.forEach((image) => {
      // Add a slug for each classes and referencing
      image.slug = _.kebabCase(image.name);

      // Add dimension details to the database for better sizing on screen
      const imagepath = process.env.PWD + '/public/images/collection/' + image.filename;
      var dimensions = sizeOf(imagepath);
      image.width = dimensions.width;
      image.height = dimensions.height;

      // Update collection with generated data
      Images.insert(image);
    });
  }
});
