<template>
  <Teleport to="body">
    <div class="reveal">
      <div class="slides">
        <section
          data-background-video="second-back.mp4"
          data-background-video-loop
          data-background-video-muted
          data-background-opacity="0.5"
        >
          <h1 style="font-size: 50px; text-align: left">
            Инструментальные и математические методы оценки экономических
            последствий <span style="color: rgb(240, 40, 40)">COVID-19</span>
          </h1>
        </section>
        
        <section
          data-background-video="market-selloff.mp4"
          data-background-video-loop
          data-background-video-muted
          data-background-opacity="0.2"
        >
          <h1
            style="
              font-size: 50px;
              color: white;
              text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4),
                0px 8px 13px rgba(0, 0, 0, 0.1),
                0px 18px 23px rgba(0, 0, 0, 0.1);
            "
          >
            Актуальность исследования
          </h1>
        </section>
        <section>
          <div id="purpose">
            <div class="fragment fade-up">
              <h3 style="color: rgb(145, 142, 142)">Объект:</h3>
              <span class="purpose-small"
                >оценка экономических последствий COVID-19</span
              >
            </div>
            <div class="fragment fade-up">
              <h3 style="color: rgb(145, 142, 142)">Предмет:</h3>
              <span class="purpose-small"
                >методы оценки экономических последствий COVID-19</span
              >
            </div>
            <div class="fragment fade-up">
              <h3 style="color: rgb(145, 142, 142)">Цель :</h3>
              <span class="purpose-small"
                >изучение методов оценки экономических последствий
                COVID-19</span
              >
            </div>
          </div>
        </section>
        <section>
          <section
            data-background-image="tasks-back.jpg"
            data-background-opacity=".2"
          >
            <h3>Задачи исследования</h3>
          </section>
          <section>
            <h3>Поиск и анализ литературных источников</h3>
            <ul style="font-size: 34px">
              <li class="fragment fade-right">
                Поиск литературных источников для исследования
              </li>
              <li class="fragment fade-right">
                Оценка релевантности найденных источников методом линейной
                свертки и их отбор
              </li>
              <li class="fragment fade-right">
                Обзор отобранных литературных источников
              </li>
            </ul>
          </section>
          <section>
            <h3>Оценивание экономических последствий COVID-19</h3>
            <ul style="font-size: 34px">
              <li class="fragment fade-right">
                Выбор методов и формулирование задачи
              </li>
              <li class="fragment fade-right">
                Сбор данных для проведения оценки
              </li>
              <li class="fragment fade-right">
                Построение модели оценивания
              </li>
              <li class="fragment fade-right">
                Интерпретация и обсуждение полученных результатов
              </li>
            </ul>
          </section>
        </section>
        <section>
          <h5>Оценка релевантности научных публикаций</h5>
          <p class="r-fit-text" style="color: rgb(255, 255, 255)">
            \begin{aligned} y_{k} = \sum_{i\, =\, 1}^{m} u_{i} f_{i}(x_{k}),\\
            \end{aligned} \begin{align*} & где\\ & x_{k} - альтернатива, \\ &
            k - номер\:альтернативы, \\ &m -
            количество\:критериев,\:по\:которым\:производится\:оценка,\\ &
            f_{i} - функция\:балльной\:оценки\:альтернативы\:x_{k}\:по\:
            критерию\:i,\\ & u_{i} -
            вес\:i-го\:критерия,\:принимающий\:значение\\
            &от\:0\:до\:1\:(сумма\:всех\:весов\:равна\:1).\\ \end{align*}
          </p>
          <p></p>
        </section>
        <section data-auto-animate>
          <h4>Отобранные научные публикации</h4>
          <ul class="r-fit-text">
            <li style="margin-bottom: 10px">
              Многослойная искусственная нейронная сеть для прогнозирования
              ВВП
            </li>
            <li style="margin-bottom: 10px">
              Вероятностный подход к оценке экономических последствий COVID-19
            </li>
            <li style="margin-bottom: 10px">
              Метод OLS оценки влияния нефармакологических вмешательств
            </li>
            <li style="margin-bottom: 10px">
              Компартментальная модель PEP выбора оптимальной политики борьбы
              с COVID-19
            </li>
            <li style="margin-bottom: 10px">
              Анализ стоимости заболевания COVID-19 в КНР
            </li>
            <li style="margin-bottom: 10px">
              Метод совокупного превышения для оценки экономического эффекта
              COVID-19 на сферу розничной торговли Великобритании
            </li>
          </ul>
        </section>
        <section data-auto-animate>
          <h4>Отобранные научные публикации</h4>
          <ul class="r-fit-text">
            <li style="margin-bottom: 10px; color: #28a745">
              Компартментальная модель PEP выбора оптимальной политики борьбы
              с COVID-19
            </li>
            <li style="margin-bottom: 10px; color: #28a745">
              Анализ стоимости заболевания COVID-19 в КНР
            </li>
            <li style="margin-bottom: 10px; color: #28a745">
              Метод совокупного превышения для оценки экономического эффекта
              COVID-19 на сферу розничной торговли Великобритании
            </li>
          </ul>
        </section>
        <section>
          <section data-background-color="white" data-transition="slide">
            <h3>Pandemic Economic Policy модель</h3>
            <img src="PEP_1.png" />
          </section>
          <section data-background-color="white">
            <h3>Экономическое расширение PEP модели</h3>
            <p class="r-fit-text">
              \begin{aligned} GDP' = b_{g} -
              p_{i}\,(\,p_{q\,i}\,S_{q}\:+\:e_{q\,i}\,E_{q}\:+\:i_{i}\,I\:+\:i_{q\,i}\,I_{q}\,),\\
              \end{aligned} \begin{align*} & где\\ & b_{g} -
              показатель\:роста\:ВВП\:в\:процентах\:в\:начале\:пандемии,\\ &
              p_{i} - коэффициент\:влияния\:пандемии\:на\:ВВП,\\
              &S_{q},\,E_{q},\,I,\,I_{q} -
              доля\:индивидов,\:помещенных\:в\:карантин\\
              &на\:различной\:стадии\:
              заболевания,\,а\:также\:доля\:инфицированных\:индивидов,\\ &
              p_{q\,i},\,e_{q\,i},\,i_{i},\,i_{q\,i} - коэффициенты,\:
              определяющие\:влияния\:доли\:находящихся\\
              &в\:карантине,\:а\:также\:инфицированных\:индивидов\\
              \end{align*}
            </p>
            <p></p>
          </section>
          <section data-background-color="white" data-transition="slide">
            <h4>Кривые Безье для NPI</h4>
            <img src="PEP_2.png" />
          </section>
          <section data-background-color="white" data-transition="slide">
            <div class="r-stack">
              <h2 class="fragment fade-out current-visible">
                Нахождение оптимального времени принятия мер
              </h2>
              <img class="fragment fade-in" src="PEP_3.png" />
              <img class="fragment fade-in" src="PEP_4.png" />
            </div>
          </section>
        </section>
        <section>
          <section
            data-background-video="illness-cost-back.mp4"
            data-background-video-loop
            data-background-video-muted
            data-background-opacity=".4"
          >
            <h2>Метод анализа стоимости заболевания</h2>
          </section>
          <section
            data-background-image="illness-cost-back.jpg"
            data-background-opacity=".5"
          >
            <h3>Прямые медицинские затраты</h3>
            <p class="r-fit-text">
              \begin{aligned} C = \sum_{x}\,p_{x}\,i_{x}\\ \end{aligned}
              \begin{align*} & где\\ & p_{x} -
              стоимость\:одного\:медицинского\:компонента\\
              &с\:учетом\:вероятности\:использования,\\ &i_{x} -
              количество\:пациентов,\:нуждающихся\\&в\:компоненте,\\ &x -
              тип\:медицинского\:компонента.\\ \end{align*}
            </p>
          </section>
          <section
            data-background-image="illness-cost-back.jpg"
            data-background-opacity=".5"
          >
            <h6>Прямые немедицинские затраты</h6>
            <p class="r-fit-text">
              \begin{aligned} TQC =
              \sum_{r}\sum_{e}\,75\,w_{r}\,d_{e}\,n_{e},\\ \end{aligned}
              \begin{align*} & где\\ & e -
              причина,\:по\:которой\:человек\:был\:помещен\\ &в\:карантин,\\
              &r - номер\:региона,\\ &n_{e} -
              количество\:человек,\:помещенных\:в\:карантин,\\ &d_{e} -
              длительность\:карантина\:в\:зависимости\\
              &от\:причины\:помещения\\ \end{align*}
            </p>
          </section>
          <section
            data-background-image="illness-cost-back.jpg"
            data-background-opacity=".5"
          >
            <h6>Потери производительности труда</h6>
            <p class="r-fit-text">
              \begin{aligned} CP_{r} = i_{r}\,f_{r}\,h_{r}\,q_{r},\\
              \end{aligned} \begin{align*} & где\\ & i_{r} -
              средняя\:заработная\:плата\:в \:день\:в\:регионе,\\ &f_{r} -
              уровень\:занятости\:в\:регионе,\\ &h_{r} -
              среднее\:количество\:дней,потерянное\\
              &в\:результате\:введения\:локдауна,\\ &q_{r} -
              численность\:населения\:региона.\\ \end{align*}
            </p>
          </section>
        </section>
        <section data-background-color="#673AB7">
          <h3>Метод совокупного превышения</h3>
          <p class="r-fit-text">
            \begin{aligned} S_{t}\,(\,C\,=\,1\,)\,-\,S_{t}\,(\,C\,=\,0),\\
            \end{aligned} \begin{align*} & где\\ &S_{t} -
            величина\:продаж\:в\:момент\:времени\:t,\\ &C -
            индикаторная\:переменная,обозначающая\\
            &наличие\:эффекта\:COVID−19.\\ \end{align*}
          </p>
        </section>
        <section
          data-background-image="assessment-back.jpg"
          data-background-opacity=".2"
        >
          <h2>Оценивание последствий COVID-19 для экономики России</h2>
        </section>
        <section>
          <h2>Уровни оценивания</h2>
          <ul>
            <li class="fragment fade-right">Уровень всей экономики</li>
            <li class="fragment fade-right" style="color: #0037a1">
              Отраслевой уровень
            </li>
            <li class="fragment fade-right" style="color: #ce2a1d">
              Подотраслевой уровень
            </li>
          </ul>
        </section>
        <section>
          <section data-background-color="white">
            <h6>Формула расчета стоимости локдауна</h6>
            <p class="r-fit-text">
              \begin{aligned} Adjusted\:CP_{r} =
              i_{r}\,f_{r}\,h_{r}\,q_{r}\,(\,1\,-\,l_{r}\,),\\ \end{aligned}
              \begin{align*} & l_{r} -
              доля\:занятых,\:работавших\:во\:время\:локдауна\\ \end{align*}
            </p>
          </section>
          <section data-background-color="white">
            <div style="text-align: left">
              <h3>Суммарные потери:</h3>
              <h5 class="fragment fade-left" style="color: rgb(218, 13, 13)">
                3 триллиона 267 миллиардов
              </h5>
              <small
                class="fragment fade-left"
                style="color: rgb(226, 34, 34)"
                >3% от ВВП 2019 года</small
              >
            </div>
          </section>
          <section data-background-color="white">
            <h5>Наиболее пострадавшие регионы</h5>
            <img src="assessment-2.png" />
          </section>
        </section>
        <section>
          <section>
            <img src="catering.png" style="border-radius: 5px" />
            <h3>Суммарные потери:</h3>
            <h6 class="fragment fade-left" style="color: rgb(218, 13, 13)">
              -120.14 миллиардов <span style="font-size: 30px">&#x20BD;</span>
            </h6>
            <small class="fragment fade-left" style="color: rgb(226, 34, 34)"
              >12% от значения 2019 года</small
            >
          </section>
          <section>
            <img src="entertainment.png" style="border-radius: 5px" />
            <h3>Суммарные потери:</h3>
            <h6 class="fragment fade-left" style="color: rgb(218, 13, 13)">
              -78.91 миллиардов <span style="font-size: 30px">&#x20BD;</span>
            </h6>
            <small class="fragment fade-left" style="color: rgb(226, 34, 34)"
              >9.8% от значения 2019 года</small
            >
          </section>
          <section>
            <img src="finance.png" style="border-radius: 5px" />
            <h3>Суммарные доходы:</h3>
            <h6 class="fragment fade-left" style="color: rgb(47, 170, 22)">
              141.24 миллиардов <span style="font-size: 30px">&#x20BD;</span>
            </h6>
            <small class="fragment fade-left" style="color: rgb(47, 170, 22)"
              >3% от значения 2019 года</small
            >
          </section>
        </section>
        <section>
          <section>
            <h3>Суммарные потери:</h3>
            <h6 style="color: rgb(218, 13, 13)">
              -776 миллиардов <span style="font-size: 30px">&#x20BD;</span>
            </h6>
            <small style="color: rgb(226, 34, 34)"
              >6% от значения 2019 года</small
            >
            <div class="r-stack">
              <img
                src="SmallProduct-min.png"
                class="fragment fade-left"
                style="border-radius: 5px"
              />
              <img
                src="LargeProduct-min.png"
                class="fragment fade-left"
                style="border-radius: 5px"
              />
            </div>
          </section>
          <section>
            <h3>Суммарные потери:</h3>
            <h6 style="color: rgb(218, 13, 13)">
              -1 триллион 566 миллиардов
              <span style="font-size: 30px">&#x20BD;</span>
            </h6>
            <small style="color: rgb(226, 34, 34)"
              >11% от значения 2019 года</small
            >
            <div class="r-stack">
              <img
                src="SmallNonProduct-min.png"
                class="fragment fade-left"
                style="border-radius: 5px"
              />
              <img
                src="LargeNonProduct-min.png"
                class="fragment fade-left"
                style="border-radius: 5px"
              />
            </div>
          </section>
        </section>
        <section>
          <h4>Заключение</h4>
          <p>
            В целом цель исследования была достигнута. Удалось как изучить
            основные методы оценки, так и осуществить оценивание экономических
            последствий для РФ за 2020 год.
          </p>
        </section>
        <section>
          <h2>Спасибо за внимание !</h2>
        </section>
        <section
          data-background-video="second-back.mp4"
          data-background-video-loop
          data-background-video-muted
          data-background-opacity="0.2"
          style="text-align: left"
        >
          <h6>
            Инструментальные и математические методы оценки экономических
            последствий <span style="color: rgb(240, 40, 40)">COVID-19</span>
          </h6>
          <div style="font-size: 20px">
            <p style="font-style: italic">
              <span
                style="
                  color: rgb(145, 142, 142);
                  font-style: normal;
                  font-weight: bold;
                  font-size: 23px;
                "
                >Автор:</span
              >
              студент 4 курса группы БИ-4, Прокофьев Савва Сергеевич
            </p>
            <p style="font-style: italic">
              <span
                style="
                  color: rgb(145, 142, 142);
                  font-style: normal;
                  font-weight: bold;
                  font-size: 23px;
                "
                >Научный руководитель:</span
              >
              доктор физико-математических наук, профессор Юрков Александр
              Васильевич
            </p>
            <p style="font-style: italic">
              <span
                style="
                  color: rgb(145, 142, 142);
                  font-style: normal;
                  font-weight: bold;
                  font-size: 23px;
                "
                >Рецензент:</span
              >
              старший менеджер Центра стратегического анализа производственной
              конфигурации ООО «Институт Гипроникель», Мелешкин Михаил
              Игоревич
            </p>
            <p style="font-style: italic">
              <span
                style="
                  color: rgb(145, 142, 142);
                  font-style: normal;
                  font-weight: bold;
                  font-size: 23px;
                "
                >Год:</span
              >
              2021
            </p>
            <p style="font-style: italic">
              <span
                style="
                  color: rgb(145, 142, 142);
                  font-style: normal;
                  font-weight: bold;
                  font-size: 23px;
                "
                ><a style="color: rgb(240, 40, 40) !important" href="/"
                  >Дополнительные материалы</a
                ></span
              >
            </p>
          </div>
        </section>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted } from '#imports';
import Reveal from 'reveal.js';
import RevealMath from 'reveal.js/plugin/math/math.esm.js';

import '~/assets/styles/reveal.css';

onMounted(() => {
  new Reveal({
    plugins: [RevealMath],
    controlsTutorial: true,
    overview: true,
    touch: true,
    slideNumber: true,
    showSlideNumber: 'all',
  }).initialize();
})
</script>
